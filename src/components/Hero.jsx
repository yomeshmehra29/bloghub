// Hero section - main landing section
function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Hi, I'm a Developer</h1>
          <p className="hero-subtitle">Creating beautiful and functional web applications</p>
          <div className="hero-cta">
            <button className="btn btn-primary">View My Work</button>
            <button className="btn btn-secondary">Get In Touch</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="avatar">👨‍💻</div>
        </div>
      </div>
      <div className="scroll-indicator">
        <p>Scroll to explore</p>
        <div className="arrow">↓</div>
      </div>
    </section>
  );
}

export default Hero;
