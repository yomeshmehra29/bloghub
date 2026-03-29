// Blog Platform localStorage utilities

const POSTS_KEY = 'blog_posts';
const COMMENTS_KEY = 'blog_comments';

// ===== POSTS FUNCTIONS =====

export const getPosts = () => {
  try {
    const data = localStorage.getItem(POSTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
};

export const savePosts = (posts) => {
  try {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving posts:', error);
  }
};

export const addPost = (postData) => {
  const posts = getPosts();
  const newPost = {
    ...postData,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0
  };
  posts.unshift(newPost); // Add to beginning for newest first
  savePosts(posts);
  return newPost;
};

export const getPostById = (id) => {
  const posts = getPosts();
  return posts.find(post => post.id === parseInt(id));
};

export const updatePost = (id, postData) => {
  const posts = getPosts();
  const index = posts.findIndex(post => post.id === parseInt(id));
  
  if (index !== -1) {
    posts[index] = {
      ...posts[index],
      ...postData,
      updatedAt: new Date().toISOString()
    };
    savePosts(posts);
    return posts[index];
  }
  return null;
};

export const deletePost = (id) => {
  const posts = getPosts();
  const filtered = posts.filter(post => post.id !== parseInt(id));
  savePosts(filtered);
  
  // Also delete all comments for this post
  deletePostComments(id);
};

export const incrementViews = (id) => {
  const posts = getPosts();
  const post = posts.find(p => p.id === parseInt(id));
  if (post) {
    post.views = (post.views || 0) + 1;
    savePosts(posts);
  }
};

export const searchPosts = (query) => {
  const posts = getPosts();
  const lowerQuery = query.toLowerCase();
  
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.description.toLowerCase().includes(lowerQuery) ||
    post.content.toLowerCase().includes(lowerQuery) ||
    post.author.toLowerCase().includes(lowerQuery)
  );
};

// ===== COMMENTS FUNCTIONS =====

export const getComments = (postId) => {
  try {
    const data = localStorage.getItem(COMMENTS_KEY);
    const allComments = data ? JSON.parse(data) : [];
    return allComments.filter(c => c.postId === parseInt(postId));
  } catch (error) {
    console.error('Error loading comments:', error);
    return [];
  }
};

export const saveComments = (comments) => {
  try {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  } catch (error) {
    console.error('Error saving comments:', error);
  }
};

export const addComment = (postId, commentData) => {
  const allComments = getAllComments();
  const newComment = {
    ...commentData,
    id: Date.now(),
    postId: parseInt(postId),
    createdAt: new Date().toISOString()
  };
  allComments.push(newComment);
  saveComments(allComments);
  return newComment;
};

export const deleteComment = (commentId) => {
  const allComments = getAllComments();
  const filtered = allComments.filter(c => c.id !== commentId);
  saveComments(filtered);
};

export const deletePostComments = (postId) => {
  const allComments = getAllComments();
  const filtered = allComments.filter(c => c.postId !== parseInt(postId));
  saveComments(filtered);
};

export const getAllComments = () => {
  try {
    const data = localStorage.getItem(COMMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading all comments:', error);
    return [];
  }
};

// Initialize with sample data if empty
export const initializeSampleData = () => {
  if (getPosts().length === 0) {
    const samplePosts = [
      {
        id: 1,
        title: 'Getting Started with React',
        description: 'Learn the basics of React and start building amazing web applications.',
        content: 'React is a JavaScript library for building user interfaces with reusable components. In this comprehensive guide, we explore the fundamentals of React, including JSX, props, state, and hooks. Whether you are a beginner or looking to refresh your knowledge, this guide covers everything you need to get started with modern React development.',
        author: 'Alex Developer',
        category: 'React',
        image: '⚛️',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        views: 245
      },
      {
        id: 2,
        title: 'JavaScript ES6 Features You Must Know',
        description: 'Master modern JavaScript with arrow functions, destructuring, and more.',
        content: 'ES6 introduced many powerful features that revolutionized JavaScript development. Learn about arrow functions, template literals, destructuring assignments, promises, async/await, classes, and modules. These features make JavaScript code more readable, maintainable, and powerful. Understanding ES6 is essential for modern web development.',
        author: 'Sarah Code',
        category: 'JavaScript',
        image: '🚀',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        views: 156
      },
      {
        id: 3,
        title: 'Building Responsive Web Design',
        description: 'Create beautiful websites that work on all devices and screen sizes.',
        content: 'Responsive design is crucial in today\'s multi-device world. Learn about media queries, flexible layouts, mobile-first approach, and CSS Grid. Understand how to create websites that adapt seamlessly to different screen sizes and devices. This guide covers practical techniques and best practices for responsive web design.',
        author: 'Mike Design',
        category: 'CSS',
        image: '🎨',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        views: 324
      }
    ];
    
    savePosts(samplePosts);
  }
};
