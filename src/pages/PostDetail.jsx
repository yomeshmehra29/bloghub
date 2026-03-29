// Post detail page - View single post with comments
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostById, getComments, addComment, deleteComment } from '../utils/storage';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  // Load post and comments
  useEffect(() => {
    const loadPostAndComments = async () => {
      try {
        setLoading(true);
        
        // Fetch the specific post by ID
        const foundPost = await getPostById(id);
        
        if (foundPost) {
          setPost(foundPost);
          
          // Fetch all comments for this post
          const postComments = await getComments(id);
          setComments(postComments);
        } else {
          // Post not found
          console.error('Post not found');
        }
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (commentData) => {
    try {
      setCommentLoading(true);
      
      // Add comment to MongoDB
      await addComment(id, commentData);
      
      // Refresh comments from database
      const updatedComments = await getComments(id);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      // Delete comment from database
      await deleteComment(commentId);
      
      // Refresh comments from database
      const updatedComments = await getComments(id);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="not-found">
        <h2>Post Not Found</h2>
        <p>The post you are looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">← Back to Posts</Link>
      </div>
    );
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="post-detail-page">
      <div className="post-detail-container">
        {/* Back Button */}
        <Link to="/" className="back-link">← Back to Posts</Link>

        {/* Post Header */}
        <article className="post-article">
          <header className="post-header">
            <div className="post-image-large">
              {post.image}
            </div>
            
            <div className="post-meta-large">
              <span className="post-category-large">{post.category}</span>
              <span className="post-views">👁️ {post.views} views</span>
            </div>

            <h1 className="post-title-large">{post.title}</h1>

            <div className="post-info">
              <span className="post-author-large">
                By <strong>{post.author}</strong>
              </span>
              <span className="post-date-large">
                {formatDate(post.createdAt)}
              </span>
              {post.updatedAt !== post.createdAt && (
                <span className="post-updated">
                  Updated {formatDate(post.updatedAt)}
                </span>
              )}
            </div>
          </header>

          {/* Post Content */}
          <div className="post-content">
            <p className="post-content-text">{post.content}</p>
          </div>

          {/* Post Actions */}
          <div className="post-actions">
            <Link 
              to={`/edit/${post.id}`} 
              className="btn btn-primary"
            >
              ✏️ Edit Post
            </Link>
          </div>
        </article>

        {/* Comments Section */}
        <section className="comments-section">
          <CommentList 
            comments={comments}
            onCommentDelete={handleCommentDelete}
          />
          
          <CommentForm 
            onSubmit={handleCommentSubmit}
            isLoading={commentLoading}
          />
        </section>
      </div>
    </div>
  );
}

export default PostDetail;
