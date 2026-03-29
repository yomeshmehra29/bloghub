// Home page - List all blog posts with search
import { useState, useEffect } from 'react';
import { getPosts, searchPosts, initializeSampleData } from '../utils/storage';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';

function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load posts from API on component mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Initialize sample data if database is empty
        await initializeSampleData();
        
        // Fetch all posts from MongoDB
        const loadedPosts = await getPosts();
        setPosts(loadedPosts);
        setFilteredPosts(loadedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        // If API fails, show empty state
        setPosts([]);
        setFilteredPosts([]);
      }
    };
    
    loadPosts();
  }, []);

  // Update filtered posts when search term changes
  useEffect(() => {
    const handleFilteredSearch = async () => {
      if (searchTerm.trim() === '') {
        setFilteredPosts(posts);
      } else {
        const results = await searchPosts(searchTerm);
        setFilteredPosts(results);
      }
    };
    
    handleFilteredSearch();
  }, [posts, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="home-page">
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to BlogHub</h1>
            <p className="hero-subtitle">
              Discover insightful articles about web development, programming, and tech trends
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="search-section">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
          />
          <div className="results-info">
            {searchTerm ? (
              <p>Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} matching "{searchTerm}"</p>
            ) : (
              <p>Showing all {posts.length} blog post{posts.length !== 1 ? 's' : ''}</p>
            )}
          </div>
        </section>

        {/* Posts Grid */}
        <section className="posts-section">
          {filteredPosts.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">📭</p>
              <p className="empty-message">
                {searchTerm 
                  ? 'No posts found matching your search. Try different keywords!' 
                  : 'No posts yet. Start writing!'}
              </p>
            </div>
          ) : (
            <div className="posts-grid">
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* Stats Section */}
        {posts.length > 0 && (
          <section className="stats-section">
            <div className="stat-card">
              <div className="stat-number">{posts.length}</div>
              <div className="stat-label">Total Articles</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{Math.min(3, posts.length)}</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{posts.reduce((sum, p) => sum + (p.views || 0), 0)}</div>
              <div className="stat-label">Total Views</div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Home;
