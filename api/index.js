// MainExpress Server Configuration
// This is the entry point for the backend API
// Sets up Express app, middleware, routes, and MongoDB connection

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import postsRouter from './routes/posts.js';
import commentsRouter from './routes/comments.js';

// Load environment variables from .env file
// This allows us to access variables like process.env.MONGODB_URI and process.env.PORT
dotenv.config();

// Initialize Express application
const app = express();

// ========== MIDDLEWARE SETUP ==========

// CORS (Cross-Origin Resource Sharing) middleware
// Allows frontend to make requests to this API from different domains
// In production, specify allowed origins: { origin: 'https://yourdomain.com' }
app.use(cors());

// Body parser middleware - Parse incoming JSON requests
// Allows app to receive form data with Content-Type: application/json
app.use(express.json());

// Body parser middleware - Parse URL-encoded data
// Allows app to receive form data with Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// ========== CONNECT TO DATABASE ==========

// Call the MongoDB connection function from config/database.js
// This establishes the connection to MongoDB Atlas cluster
connectDB();

// ========== API ROUTES ==========

// Mount the posts router
// All routes in postsRouter will be prefixed with /api/
// Examples: GET /api/posts, POST /api/posts, DELETE /api/posts/:id
app.use('/api/', postsRouter);

// Mount the comments router
// Examples: GET /api/comments/:postId, POST /api/comments, DELETE /api/comments/:id
app.use('/api/', commentsRouter);

// ========== HEALTH CHECK ENDPOINT ==========

// GET /api/health - Health check endpoint
// Used by load balancers and monitoring services to verify API is running
// Returns simple JSON response indicating API is healthy
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'BlogHub API is running',
    timestamp: new Date().toISOString()
  });
});

// ========== ROOT ENDPOINT ==========

// GET / - Root endpoint
// Provides information about available API endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'BlogHub API',
    version: '1.0.0',
    endpoints: {
      posts: {
        getAll: 'GET /api/posts',
        getById: 'GET /api/posts/:id',
        create: 'POST /api/posts',
        update: 'PUT /api/posts/:id',
        delete: 'DELETE /api/posts/:id',
        search: 'GET /api/search/:query'
      },
      comments: {
        getByPostId: 'GET /api/comments/:postId',
        create: 'POST /api/comments',
        update: 'PUT /api/comments/:id',
        delete: 'DELETE /api/comments/:id'
      },
      health: 'GET /api/health'
    }
  });
});

// ========== ERROR HANDLING MIDDLEWARE ==========

// 404 Not Found middleware
// Catches any request that doesn't match existing routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`,
    availableEndpoints: {
      posts: '/api/posts',
      comments: '/api/comments/:postId'
    }
  });
});

// Global error handling middleware
// Catches any unhandled errors thrown in route handlers
app.use((error, req, res, next) => {
  console.error('Unhandled Error:', error);
  res.status(error.status || 500).json({
    success: false,
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
  });
});

// ========== SERVER STARTUP ==========

// Get port from environment variable or use default 5000
const PORT = process.env.PORT || 5000;

// Start listening on specified port
// This makes the server available for incoming HTTP requests
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 BlogHub API available at http://localhost:${PORT}`);
});

// Export app for testing purposes (if needed)
export default app;
