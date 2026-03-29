// Header component with navigation
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">📝</span>
          <span className="logo-text">BlogHub</span>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">All Posts</Link>
          <Link to="/create" className="nav-link btn-create-header">
            ✨ Write Post
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
