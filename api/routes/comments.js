// Blog Comments API Routes
// This file handles all HTTP endpoints for comment operations
// Includes CRUD operations for comments associated with blog posts

import express from 'express';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

// Create an Express Router instance
const router = express.Router();

// ========== GET ROUTES ==========

// GET /api/comments/:postId - Retrieve all comments for a specific post
// Params: postId (MongoDB ObjectId of the post)
// Returns: Array of comments for that post
router.get('/comments/:postId', async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      });
    }
    
    // Query MongoDB for all comments linked to this postId
    // Sort by newest comments first (descending order)
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: -1 });
    
    // Send successful response with comments array
    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching comments',
      error: error.message
    });
  }
});

// GET /api/comments/:id/single - Retrieve a specific comment by ID
// Params: id (MongoDB ObjectId of the comment)
// Returns: Single comment object
router.get('/comments/:id/single', async (req, res) => {
  try {
    // Find comment by MongoDB ObjectId
    const comment = await Comment.findById(req.params.id);
    
    // Check if comment exists
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }
    
    // Send successful response with the comment
    res.status(200).json({
      success: true,
      data: comment
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching comment',
      error: error.message
    });
  }
});

// ========== CREATE ROUTES ==========

// POST /api/comments - Create a new comment on a post
// Body parameters (required):
//   - postId: string (MongoDB ObjectId of the post this comment is for)
//   - author: string (name of commenter)
//   - email: string (email of commenter, must be valid format)
//   - content: string (min 5 chars, max 5000 chars)
// Returns: Newly created comment object
router.post('/comments', async (req, res) => {
  try {
    // Extract comment data from request body
    const { postId, author, email, content } = req.body;
    
    // Validate required fields
    if (!postId || !author || !email || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: postId, author, email, content'
      });
    }
    
    // Validate MongoDB ObjectId format for postId
    if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      });
    }
    
    // Verify that the post exists before creating comment
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    // Create a new Comment document using Mongoose schema
    const newComment = new Comment({
      postId: postId,
      author: author.trim(),
      email: email.trim().toLowerCase(),
      content: content.trim()
      // createdAt is automatically set by Mongoose timestamps
    });
    
    // Save the new comment to MongoDB
    const savedComment = await newComment.save();
    
    // Send successful response with the created comment
    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: savedComment
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating comment',
      error: error.message
    });
  }
});

// ========== UPDATE ROUTES ==========

// PUT /api/comments/:id - Update an existing comment
// Params: id (MongoDB ObjectId of comment to update)
// Body: Comment fields to update (author, email, content)
// Returns: Updated comment object
router.put('/comments/:id', async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid comment ID'
      });
    }
    
    // Find comment and update it with new data
    // { new: true } returns the updated document instead of original
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return updated doc and validate schema
    );
    
    // Check if comment exists
    if (!updatedComment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }
    
    // Send successful response with updated comment
    res.status(200).json({
      success: true,
      message: 'Comment updated successfully',
      data: updatedComment
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating comment',
      error: error.message
    });
  }
});

// ========== DELETE ROUTES ==========

// DELETE /api/comments/:id - Delete a comment
// Params: id (MongoDB ObjectId of comment to delete)
// Returns: Success message
router.delete('/comments/:id', async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid comment ID'
      });
    }
    
    // Find and delete the comment by ID
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    
    // Check if comment exists
    if (!deletedComment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }
    
    // Send successful response
    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
      data: deletedComment
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting comment',
      error: error.message
    });
  }
});

// Export router for use in main Express app
export default router;
