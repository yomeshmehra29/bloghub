// Edit post page
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostById, updatePost, deletePost } from '../utils/storage';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    author: '',
    category: 'Technology',
    image: '📝'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const categories = ['Technology', 'Web Development', 'JavaScript', 'React', 'CSS', 'Career'];
  const emojis = ['📝', '⚛️', '🚀', '🎨', '💻', '🔥', '💡', '📚'];

  // Load post data
  useEffect(() => {
    const post = getPostById(id);
    if (post) {
      setFormData(post);
    }
    setLoading(false);
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 50) {
      newErrors.content = 'Content must be at least 50 characters';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    updatePost(id, formData);
    navigate(`/post/${id}`);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      deletePost(id);
      navigate('/');
    }
  };

  if (loading) {
    return <div className="loading"><p>Loading post...</p></div>;
  }

  return (
    <div className="edit-post-page">
      <div className="edit-post-container">
        <div className="edit-post-header">
          <h1>Edit Post</h1>
          <p>Update your post content</p>
        </div>

        <form className="post-form" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Post Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter an engaging title..."
              className={`form-input ${errors.title ? 'error' : ''}`}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          {/* Author and Category - Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="author">Author Name *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Your name"
                className={`form-input ${errors.author ? 'error' : ''}`}
              />
              {errors.author && <span className="error-message">{errors.author}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-input"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="image">Icon</label>
              <select
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-input emoji-select"
              >
                {emojis.map(emoji => (
                  <option key={emoji} value={emoji}>{emoji}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a brief description of your post..."
              rows="2"
              className={`form-input ${errors.description ? 'error' : ''}`}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          {/* Content */}
          <div className="form-group">
            <label htmlFor="content">Post Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your full post content here..."
              rows="10"
              className={`form-input ${errors.content ? 'error' : ''}`}
            />
            {errors.content && <span className="error-message">{errors.content}</span>}
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-large">
              💾 Save Changes
            </button>
            <button 
              type="button" 
              className="btn btn-danger"
              onClick={handleDelete}
            >
              🗑️ Delete Post
            </button>
            <Link to={`/post/${id}`} className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
