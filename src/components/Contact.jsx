// Contact section - contact form and information
import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>Have a project in mind or want to collaborate? I'd love to hear from you!</p>
            
            <div className="contact-links">
              <a href="mailto:hello@example.com" className="contact-item">
                <span className="icon">✉️</span>
                <div>
                  <h4>Email</h4>
                  <p>hello@example.com</p>
                </div>
              </a>

              <a href="tel:+1234567890" className="contact-item">
                <span className="icon">📱</span>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (234) 567-890</p>
                </div>
              </a>

              <a href="#" className="contact-item">
                <span className="icon">📍</span>
                <div>
                  <h4>Location</h4>
                  <p>San Francisco, USA</p>
                </div>
              </a>
            </div>

            <div className="social-links">
              <a href="#" className="social-btn" title="GitHub">GitHub</a>
              <a href="#" className="social-btn" title="LinkedIn">LinkedIn</a>
              <a href="#" className="social-btn" title="Twitter">Twitter</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>

            {submitted && (
              <div className="success-message">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
