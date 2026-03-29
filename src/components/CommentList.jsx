// Component to display all comments on a post
import { deleteComment } from '../utils/storage';

function CommentList({ comments, onCommentDelete }) {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (comments.length === 0) {
    return (
      <div className="no-comments">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="comments-container">
      <h3 className="comments-title">
        💬 Comments ({comments.length})
      </h3>
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment-item">
            <div className="comment-header">
              <div className="comment-author">
                <strong>{comment.author}</strong>
                <span className="comment-email">{comment.email}</span>
              </div>
              <span className="comment-date">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="comment-text">{comment.content}</p>
            <button
              className="delete-comment-btn"
              onClick={() => {
                if (confirm('Delete this comment?')) {
                  deleteComment(comment.id);
                  onCommentDelete(comment.id);
                }
              }}
              title="Delete comment"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;
