// Skills section - display technical skills
import { useState } from 'react';

function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('frontend');

  const skills = {
    frontend: [
      { name: 'React.js', level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'CSS3', level: 85 },
      { name: 'HTML5', level: 90 },
      { name: 'Responsive Design', level: 92 }
    ],
    backend: [
      { name: 'Node.js', level: 80 },
      { name: 'Express.js', level: 78 },
      { name: 'REST APIs', level: 82 },
      { name: 'Database Design', level: 75 }
    ],
    tools: [
      { name: 'Git', level: 85 },
      { name: 'VS Code', level: 95 },
      { name: 'Vite', level: 88 },
      { name: 'npm/yarn', level: 85 }
    ]
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>

        <div className="skills-tabs">
          <button 
            className={`tab ${selectedCategory === 'frontend' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('frontend')}
          >
            Frontend
          </button>
          <button 
            className={`tab ${selectedCategory === 'backend' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('backend')}
          >
            Backend
          </button>
          <button 
            className={`tab ${selectedCategory === 'tools' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('tools')}
          >
            Tools
          </button>
        </div>

        <div className="skills-grid">
          {skills[selectedCategory].map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-header">
                <h3>{skill.name}</h3>
                <span className="level">{skill.level}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
