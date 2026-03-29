// Projects section - showcase portfolio projects
import { useState } from 'react';

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Employee Management System',
      description: 'A complete CRUD application for managing employee records with localStorage persistence.',
      image: '📋',
      tags: ['React', 'JavaScript', 'localStorage', 'CSS'],
      details: 'Built with React hooks, form validation, and localStorage. Features include add, edit, delete operations with real-time updates.'
    },
    {
      id: 2,
      title: 'E-Commerce Store',
      description: 'Modern online shopping platform with product filtering and shopping cart functionality.',
      image: '🛒',
      tags: ['React', 'State Management', 'CSS Grid', 'API'],
      details: 'Full-featured e-commerce app with product browsing, filtering by category, and cart management.'
    },
    {
      id: 3,
      title: 'Weather App',
      description: 'Real-time weather information with location-based forecasts and beautiful UI.',
      image: '🌤️',
      tags: ['React', 'API Integration', 'Responsive Design'],
      details: 'Fetches real-time weather data using APIs. Shows current weather, forecasts, and location-based information.'
    },
    {
      id: 4,
      title: 'Task Manager Pro',
      description: 'Productivity app for managing daily tasks with categories and priorities.',
      image: '✅',
      tags: ['React', 'localStorage', 'Hooks', 'Drag & Drop'],
      details: 'Advanced task management with drag-and-drop, categories, priorities, and persistent storage.'
    },
    {
      id: 5,
      title: 'Social Feed App',
      description: 'Social media feed with posts, likes, comments, and user interactions.',
      image: '📱',
      tags: ['React', 'Context API', 'State Management'],
      details: 'Complete social feed application with real-time updates, likes, comments, and user profiles.'
    },
    {
      id: 6,
      title: 'Music Player',
      description: 'Beautiful music player with playlist management and audio controls.',
      image: '🎵',
      tags: ['React', 'Audio API', 'CSS Animations'],
      details: 'Feature-rich music player with playlist support, shuffle, repeat, and volume control.'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        <div className="projects-grid">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="project-card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-image">{project.image}</div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button 
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>
              <div className="modal-header">
                <div className="modal-image">{selectedProject.image}</div>
                <h2>{selectedProject.title}</h2>
              </div>
              <p className="modal-description">{selectedProject.details}</p>
              <div className="modal-tags">
                {selectedProject.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
              <div className="modal-actions">
                <button className="btn btn-primary">View Project</button>
                <button className="btn btn-secondary">View Code</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
