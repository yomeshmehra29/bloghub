// Post card component for displaying posts in list
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="post-card">
      <div className="post-card-image">
        {post.image}
      </div>
      
      <div className="post-card-content">
        <div className="post-meta">
          <span className="post-category">{post.category}</span>
          <span className="post-date">{formatDate(post.createdAt)}</span>
        </div>
        
        <h2 className="post-title">
          <Link to={`/post/${post.id}`}>
            {post.title}
          </Link>
        </h2>
        
        <p className="post-description">
          {post.description}
        </p>
        
        <div className="post-footer">
          <div className="post-author">
            By <strong>{post.author}</strong>
          </div>
          <div className="post-stats">
            <span className="stat">👁️ {post.views || 0} views</span>
            <span className="stat">💬 Comments</span>
          </div>
        </div>
        
        <Link to={`/post/${post.id}`} className="read-more">
          Read More →
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
