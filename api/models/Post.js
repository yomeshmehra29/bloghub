// MongoDB Post Model Schema
// This file defines the structure of a blog post document in MongoDB
// Each post contains title, description, content, author, category, and metadata

import mongoose from 'mongoose';

// Define the Post schema
const PostSchema = new mongoose.Schema(
  {
    // Post title - required string field
    title: {
      type: String,
      required: [true, 'Please provide a post title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    
    // Brief description of the post - appears in post cards
    description: {
      type: String,
      required: [true, 'Please provide a post description'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    
    // Full post content/body
    content: {
      type: String,
      required: [true, 'Please provide post content'],
      minlength: [50, 'Content must be at least 50 characters']
    },
    
    // Author name
    author: {
      type: String,
      required: [true, 'Please provide author name'],
      trim: true
    },
    
    // Blog post category (e.g., React, JavaScript, CSS)
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['Technology', 'Web Development', 'JavaScript', 'React', 'CSS', 'Career', 'Other'],
      default: 'Technology'
    },
    
    // Emoji icon for visual representation
    image: {
      type: String,
      default: '📝'
    },
    
    // View counter - incremented each time post is viewed
    views: {
      type: Number,
      default: 0,
      min: 0
    },
    
    // Automatic timestamp creation and updates
    // createdAt: When post was first created
    // updatedAt: When post was last modified
  },
  {
    // Enable automatic timestamps (createdAt and updatedAt)
    timestamps: true
  }
);

// Create and export the Post model
// The model is named 'Post' and uses the PostSchema we defined above
export default mongoose.model('Post', PostSchema);
