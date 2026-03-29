// Vercel Serverless Function Handler
// This file exports the Express app as a serverless function
// Vercel automatically detects this file and deploys it as API routes

import app from './api/index.js';

// Export the Express app as the default handler
// Vercel will call this function for all /api/* requests
export default app;
