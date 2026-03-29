// API Client - Frontend HTTP Request Functions
// This file handles all communication between React frontend and Express backend
// All functions use fetch() to make HTTP requests to the backend API

// Determine API base URL based on environment
// In production (Vercel): Uses the deployed domain
// In development (localhost): Uses local API server
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ===== POSTS API FUNCTIONS =====

// Fetch all blog posts from MongoDB
// Optional parameters: search term, sort order
// Returns: Array of all posts
export const getPosts = async (searchTerm = '', sortBy = 'newest') => {
  try {
    // Build query string for API endpoint
    // Example: /api/posts?search=react&sort=newest
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.append('search', searchTerm);
    if (sortBy) queryParams.append('sort', sortBy);
    
    // Make GET request to backend
    const response = await fetch(`${API_BASE_URL}/posts?${queryParams}`);
    
    // Check if response is successful (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse JSON response
    const data = await response.json();
    
    // Return posts array from response
    return data.data || [];
    
  } catch (error) {
    // Log error to console for debugging
    console.error('Error fetching posts:', error);
    // Return empty array on error instead of crashing
    return [];
  }
};

// Fetch a single blog post by ID
// Automatically increments view counter when called
// Returns: Single post object with full content
export const getPostById = async (id) => {
  try {
    // Validate ID format (MongoDB ObjectId)
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid post ID');
    }
    
    // Make GET request to backend
    // This endpoint automatically increments view count
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    
    // Check if post exists
    if (response.status === 404) {
      return null; // Post not found
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse and return post data
    const data = await response.json();
    return data.data || null;
    
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return null;
  }
};

// Create a new blog post
// Sends post data to backend for MongoDB storage
// Returns: Created post object with MongoDB ID
export const addPost = async (postData) => {
  try {
    // Validate required fields exist
    if (!postData.title || !postData.description || !postData.content || !postData.author) {
      throw new Error('Missing required post fields');
    }
    
    // Make POST request to backend with post data
    // Content-Type is automatically set to application/json by fetch
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',              // HTTP method
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData) // Convert post object to JSON string
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse and return created post
    const data = await response.json();
    return data.data;
    
  } catch (error) {
    console.error('Error creating post:', error);
    throw error; // Re-throw error for component to handle
  }
};

// Update an existing blog post
// Sends updated data to backend
// Returns: Updated post object
export const updatePost = async (id, postData) => {
  try {
    // Validate post ID
    if (!id) {
      throw new Error('Post ID is required');
    }
    
    // Make PUT request to backend
    // Only sends fields that are provided (partial update)
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',               // HTTP method for updates
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse and return updated post
    const data = await response.json();
    return data.data;
    
  } catch (error) {
    console.error(`Error updating post ${id}:`, error);
    throw error;
  }
};

// Delete a blog post
// Also deletes all comments associated with the post
// Returns: Deleted post object (just for confirmation)
export const deletePost = async (id) => {
  try {
    // Validate post ID
    if (!id) {
      throw new Error('Post ID is required');
    }
    
    // Make DELETE request to backend
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE' // HTTP method for deletion
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse and return deleted post data
    const data = await response.json();
    return data.data;
    
  } catch (error) {
    console.error(`Error deleting post ${id}:`, error);
    throw error;
  }
};

// Search blog posts by query term
// Searches across title, description, content, author, category
// Returns: Array of matching posts
export const searchPosts = async (query) => {
  try {
    // Validate search query
    if (!query || typeof query !== 'string') {
      return [];
    }
    
    // Make GET request to search endpoint
    const response = await fetch(`${API_BASE_URL}/search/${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse and return matching posts
    const data = await response.json();
    return data.data || [];
    
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
};

// ===== COMMENTS API FUNCTIONS =====

// Fetch all comments for a specific post
// Returns: Array of all comments for that post
export const getComments = async (postId) => {
  try {
    // Validate post ID
    if (!postId) {
      throw new Error('Post ID is required');
    }
    
    // Make GET request to backend
    const response = await fetch(`${API_BASE_URL}/comments/${postId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse and return comments array
    const data = await response.json();
    return data.data || [];
    
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
};

// Create a new comment on a post
// Sends comment data to backend for MongoDB storage
// Returns: Created comment object with MongoDB ID
export const addComment = async (postId, commentData) => {
  try {
    // Validate required fields
    if (!postId || !commentData.author || !commentData.email || !commentData.content) {
      throw new Error('Missing required comment fields');
    }
    
    // Make POST request to backend
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId: postId,
        ...commentData
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse and return created comment
    const data = await response.json();
    return data.data;
    
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

// Delete a comment
// Returns: Deleted comment object (for confirmation)
export const deleteComment = async (commentId) => {
  try {
    // Validate comment ID
    if (!commentId) {
      throw new Error('Comment ID is required');
    }
    
    // Make DELETE request to backend
    const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse and return deleted comment
    const data = await response.json();
    return data.data;
    
  } catch (error) {
    console.error(`Error deleting comment ${commentId}:`, error);
    throw error;
  }
};

// ===== UTILITY FUNCTIONS =====

// Initialize database with sample posts if empty
// Automatically called on first page load
// Only runs if database has no posts
export const initializeSampleData = async () => {
  try {
    // Fetch all posts to check if database is empty
    const posts = await getPosts();
    
    // If database already has posts, don't add samples
    if (posts.length > 0) {
      return;
    }
    
    // Sample blog posts to initialize database
    const samplePosts = [
      {
        title: 'Getting Started with React',
        description: 'Learn the basics of React and start building amazing web applications.',
        content: 'React is a JavaScript library for building user interfaces with reusable components. In this comprehensive guide, we explore the fundamentals of React, including JSX, props, state, and hooks. Whether you are a beginner or looking to refresh your knowledge, this guide covers everything you need to get started with modern React development.',
        author: 'Alex Developer',
        category: 'React',
        image: '⚛️'
      },
      {
        title: 'JavaScript ES6 Features You Must Know',
        description: 'Master modern JavaScript with arrow functions, destructuring, and more.',
        content: 'ES6 introduced many powerful features that revolutionized JavaScript development. Learn about arrow functions, template literals, destructuring assignments, promises, async/await, classes, and modules. These features make JavaScript code more readable, maintainable, and powerful. Understanding ES6 is essential for modern web development.',
        author: 'Sarah Code',
        category: 'JavaScript',
        image: '🚀'
      },
      {
        title: 'Building Responsive Web Design',
        description: 'Create beautiful websites that work on all devices and screen sizes.',
        content: 'Responsive design is crucial in today\'s multi-device world. Learn about media queries, flexible layouts, mobile-first approach, and CSS Grid. Understand how to create websites that adapt seamlessly to different screen sizes and devices. This guide covers practical techniques and best practices for responsive web design.',
        author: 'Mike Design',
        category: 'CSS',
        image: '🎨'
      }
    ];
    
    // Create each sample post in database
    for (const post of samplePosts) {
      await addPost(post);
    }
    
    console.log('✓ Sample data initialized successfully');
    
  } catch (error) {
    console.error('Error initializing sample data:', error);
    // Continue even if sample data fails - user can create posts manually
  }
};
