// MongoDB Comment Model Schema
// This file defines the structure of a comment document in MongoDB
// Comments are associated with specific blog posts through postId reference

import mongoose from 'mongoose';

// Define the Comment schema
const CommentSchema = new mongoose.Schema(
  {
    // Reference to the post this comment belongs to
    // postId links to the Post model using MongoDB ObjectId
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Comment must be associated with a post']
    },
    
    // Commenter's name - required
    author: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    
    // Commenter's email address
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    
    // The comment text content
    content: {
      type: String,
      required: [true, 'Comment cannot be empty'],
      trim: true,
      minlength: [5, 'Comment must be at least 5 characters'],
      maxlength: [5000, 'Comment cannot exceed 5000 characters']
    },
    
    // Automatic timestamps - tracks when comment was created
  },
  {
    // Enable automatic timestamps (createdAt and updatedAt)
    timestamps: true
  }
);

// Create and export the Comment model
// This allows us to create, read, update, delete comment documents in MongoDB
export default mongoose.model('Comment', CommentSchema);
