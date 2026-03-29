// MongoDB Connection Configuration
// This file establishes the connection to MongoDB Atlas using Mongoose ORM
// Handles connection errors and provides a reusable connection function

import mongoose from 'mongoose';

// Function to connect to MongoDB
export const connectDB = async () => {
  try {
    // Get MongoDB URI from environment variables
    // MongoDB Atlas connection string format: mongodb+srv://username:password@cluster.mongodb.net/database
    const mongoURI = process.env.MONGODB_URI;
    
    // Validate that MongoDB URI is provided
    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    
    // Create Mongoose connection
    // Modern versions of Mongoose automatically use the new URL parser and unified topology
    await mongoose.connect(mongoURI);
    
    // Log successful connection
    console.log('✓ MongoDB connected successfully');
    
    // Return the mongoose instance for chaining if needed
    return mongoose;
    
  } catch (error) {
    // Log connection errors
    console.error('✗ MongoDB connection failed:', error.message);
    
    // Exit process with failure code (1 = error)
    process.exit(1);
  }
};

// Export the mongoose instance itself for model creation
export default mongoose;
