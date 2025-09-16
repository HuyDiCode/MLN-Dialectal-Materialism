import { Parallax } from 'react-scroll-parallax';
import { ChevronDown } from './icons/ChevronDown';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  const scrollToTimeline = () => {
    const timelineElement = document.getElementById('timeline-section');
    if (timelineElement) {
      timelineElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <Parallax speed={-10} className="hero-background">
        <div className="hero-bg-gradient"></div>
      </Parallax>
      
      <div className="hero-content">
        <Parallax speed={5}>
          <h1 className="hero-title">
            Dialectical
            <span className="hero-title-accent">Materialism</span>
          </h1>
        </Parallax>
        
        <Parallax speed={3}>
          <p className="hero-subtitle">
            A Journey Through Revolutionary Ideas and Transformative Moments
          </p>
        </Parallax>
        
        <Parallax speed={1}>
          <button 
            className="scroll-indicator"
            onClick={scrollToTimeline}
            aria-label="Scroll to timeline"
          >
            <span className="scroll-text">Explore Our Story</span>
            <ChevronDown className="scroll-icon" />
          </button>
        </Parallax>
      </div>
    </section>
  );
};

export default HeroSection;
