// Comment form component for adding new comments
import { useState } from 'react';

function CommentForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    content: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.author.trim()) {
      newErrors.author = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Comment cannot be empty';
    } else if (formData.content.trim().length < 5) {
      newErrors.content = 'Comment must be at least 5 characters';
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

    onSubmit(formData);

    // Reset form
    setFormData({
      author: '',
      email: '',
      content: ''
    });
    setErrors({});
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Leave a Comment</h3>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="author">Name *</label>
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
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={`form-input ${errors.email ? 'error' : ''}`}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="content">Comment *</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Share your thoughts..."
          rows="4"
          className={`form-input ${errors.content ? 'error' : ''}`}
        />
        {errors.content && <span className="error-message">{errors.content}</span>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}

export default CommentForm;
