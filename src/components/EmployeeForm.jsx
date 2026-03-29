// Employee form component for adding and editing employees
import { useState, useEffect } from 'react';

function EmployeeForm({ onSubmit, initialData, isEditing }) {
  // Form state for each field
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: ''
  });

  // Track validation errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // When editing, fill form with existing data
  useEffect(() => {
    if (initialData && isEditing) {
      setFormData(initialData);
    } else {
      // Reset form when not editing
      setFormData({
        name: '',
        email: '',
        role: '',
        department: ''
      });
      setErrors({});
      setTouched({});
    }
  }, [initialData, isEditing]);

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle field blur (when user leaves field)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate before submitting
    if (!validateForm()) {
      return;
    }

    // Send data to parent component
    onSubmit(formData);

    // Reset form after successful submit
    setFormData({
      name: '',
      email: '',
      role: '',
      department: ''
    });
    setErrors({});
    setTouched({});
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2 className="form-title">
        {isEditing ? 'Edit Employee' : 'Add New Employee'}
      </h2>

      {/* Name Field */}
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="John Doe"
          className={`form-input ${errors.name && touched.name ? 'error' : ''}`}
        />
        {errors.name && touched.name && (
          <span className="error-message">{errors.name}</span>
        )}
      </div>

      {/* Email Field */}
      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="john@example.com"
          className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
        />
        {errors.email && touched.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>

      {/* Role Field */}
      <div className="form-group">
        <label htmlFor="role">Role *</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g., Developer, Manager"
          className={`form-input ${errors.role && touched.role ? 'error' : ''}`}
        />
        {errors.role && touched.role && (
          <span className="error-message">{errors.role}</span>
        )}
      </div>

      {/* Department Field */}
      <div className="form-group">
        <label htmlFor="department">Department *</label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g., IT, HR, Sales"
          className={`form-input ${errors.department && touched.department ? 'error' : ''}`}
        />
        {errors.department && touched.department && (
          <span className="error-message">{errors.department}</span>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary">
        {isEditing ? 'Update Employee' : 'Add Employee'}
      </button>
    </form>
  );
}

export default EmployeeForm;
