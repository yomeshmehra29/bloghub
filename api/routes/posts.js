// Blog Posts API Routes
// This file handles all HTTP endpoints for blog post operations
// Includes CRUD operations: Create, Read, Update, Delete

import express from 'express';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

// Create an Express Router instance
const router = express.Router();

// ========== GET ROUTES ==========

// GET /api/posts - Retrieve all blog posts
// Query parameters: 
//   - search: search term to filter posts
//   - sort: 'newest' (default) or 'views' to sort results
// Returns: Array of all posts or filtered posts
router.get('/posts', async (req, res) => {
  try {
    // Optional search parameter for filtering
    const searchQuery = req.query.search || '';
    
    // Build MongoDB filter object
    // Searches in title, description, content, author, and category fields
    let filter = {};
    if (searchQuery) {
      filter = {
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },           // Case-insensitive search
          { description: { $regex: searchQuery, $options: 'i' } },
          { content: { $regex: searchQuery, $options: 'i' } },
          { author: { $regex: searchQuery, $options: 'i' } },
          { category: { $regex: searchQuery, $options: 'i' } }
        ]
      };
    }
    
    // Determine sort order (default: newest first)
    let sortOrder = { createdAt: -1 }; // -1 = descending (newest first)
    if (req.query.sort === 'views') {
      sortOrder = { views: -1 }; // Sort by view count instead
    }
    
    // Query MongoDB for posts matching the filter
    // Populate comments for each post
    const posts = await Post.find(filter)
      .sort(sortOrder)
      .populate('comments'); // Include related comments if they exist
    
    // Send successful response with posts
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
    
  } catch (error) {
    // Handle errors and send error response
    res.status(500).json({
      success: false,
      message: 'Error fetching posts',
      error: error.message
    });
  }
});

// GET /api/posts/:id - Retrieve a single post by ID
// Params: id (MongoDB ObjectId of the post)
// Returns: Single post document with populated comments
router.get('/posts/:id', async (req, res) => {
  try {
    // Find post by MongoDB ObjectId
    const post = await Post.findById(req.params.id);
    
    // Check if post exists
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    // Increment view count by 1 each time this endpoint is called
    post.views = (post.views || 0) + 1;
    
    // Save the updated view count to MongoDB
    await post.save();
    
    // Send successful response with the post
    res.status(200).json({
      success: true,
      data: post
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching post',
      error: error.message
    });
  }
});

// ========== CREATE ROUTES ==========

// POST /api/posts - Create a new blog post
// Body parameters (required):
//   - title: string (max 200 chars)
//   - description: string (max 500 chars)
//   - content: string (min 50 chars)
//   - author: string
//   - category: string (enum: Technology, Web Development, JavaScript, React, CSS, Career, Other)
//   - image: string (emoji or icon URL, optional default: 📝)
// Returns: Newly created post object
router.post('/posts', async (req, res) => {
  try {
    // Extract post data from request body
    const { title, description, content, author, category, image } = req.body;
    
    // Validate required fields
    if (!title || !description || !content || !author || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, description, content, author, category'
      });
    }
    
    // Create a new Post document using Mongoose schema
    const newPost = new Post({
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      author: author.trim(),
      category: category,
      image: image || '📝',
      views: 0  // Initialize view count to 0
    });
    
    // Save the new post to MongoDB
    const savedPost = await newPost.save();
    
    // Send successful response with the created post
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: savedPost
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating post',
      error: error.message
    });
  }
});

// ========== UPDATE ROUTES ==========

// PUT /api/posts/:id - Update an existing blog post
// Params: id (MongoDB ObjectId of post to update)
// Body: Any post fields to update (partial update supported)
// Returns: Updated post object
router.put('/posts/:id', async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      });
    }
    
    // Find post and update it with new data
    // { new: true } returns the updated document instead of original
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        // Force updatedAt to current time (MongoDB does this automatically with timestamps)
      },
      { new: true, runValidators: true } // Return updated doc and validate schema
    );
    
    // Check if post exists
    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    // Send successful response with updated post
    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating post',
      error: error.message
    });
  }
});

// ========== DELETE ROUTES ==========

// DELETE /api/posts/:id - Delete a blog post and all its comments
// Params: id (MongoDB ObjectId of post to delete)
// Returns: Success message
router.delete('/posts/:id', async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      });
    }
    
    // Find and delete the post by ID
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    
    // Check if post exists
    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    // Also delete all comments associated with this post
    await Comment.deleteMany({ postId: req.params.id });
    
    // Send successful response
    res.status(200).json({
      success: true,
      message: 'Post and all associated comments deleted successfully',
      data: deletedPost
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting post',
      error: error.message
    });
  }
});

// ========== SEARCH ROUTES ==========

// GET /api/posts/search/query - Advanced search for posts
// Query parameters: q (search query)
// Returns: Array of matching posts
router.get('/search/:query', async (req, res) => {
  try {
    // Get search query from URL parameter
    const query = req.params.query;
    
    // Search MongoDB with regex for flexible matching
    const results = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
    
    // Send search results
    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching posts',
      error: error.message
    });
  }
});

// Export router for use in main Express app
export default router;
