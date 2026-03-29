// About section - information about the developer
function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate full-stack developer with a love for creating intuitive and beautiful web applications. 
              With expertise in React, JavaScript, and modern web technologies, I transform ideas into reality.
            </p>
            <p>
              My journey in web development started with curiosity and has evolved into a commitment to writing clean, 
              efficient code that solves real-world problems. I believe in continuous learning and staying updated with 
              the latest technologies.
            </p>
            
            <div className="about-stats">
              <div className="stat">
                <h3>5+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>2+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h3>100%</h3>
                <p>Client Satisfaction</p>
              </div>
            </div>
          </div>

          <div className="about-highlight">
            <div className="highlight-box">
              <h3>What I Do</h3>
              <ul>
                <li>✨ Build responsive web applications</li>
                <li>📱 Create mobile-friendly designs</li>
                <li>⚡ Optimize performance and UX</li>
                <li>🎨 Design beautiful interfaces</li>
                <li>🔧 Develop scalable solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
