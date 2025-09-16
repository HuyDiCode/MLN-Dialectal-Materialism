import { Parallax } from 'react-scroll-parallax';
import type { TimelineMilestone } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './TimelineItem.css';

interface TimelineItemProps {
  milestone: TimelineMilestone;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ milestone, index }) => {
  const isLeft = milestone.position === 'left';
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div 
      ref={ref}
      className={`timeline-item ${isLeft ? 'timeline-item--left' : 'timeline-item--right'} ${
        isIntersecting ? 'timeline-item--visible' : ''
      }`}
    >
      <div className="timeline-item__container">
        {/* Timeline marker */}
        <Parallax speed={-2} className="timeline-marker">
          <div className="timeline-marker__dot">
            <span className="timeline-marker__number">{index + 1}</span>
          </div>
          <div className="timeline-marker__line"></div>
        </Parallax>

        {/* Content section */}
        <div className="timeline-content">
          {isLeft ? (
            <>
              <Parallax speed={2} className="timeline-text">
                <div className="timeline-date">{milestone.date}</div>
                <h3 className="timeline-title">{milestone.title}</h3>
                <p className="timeline-description">{milestone.description}</p>
              </Parallax>
              <Parallax speed={-1} className="timeline-image">
                <img 
                  src={milestone.imageUrl} 
                  alt={milestone.imageAlt}
                  loading="lazy"
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.opacity = '1';
                  }}
                />
              </Parallax>
            </>
          ) : (
            <>
              <Parallax speed={-1} className="timeline-image">
                <img 
                  src={milestone.imageUrl} 
                  alt={milestone.imageAlt}
                  loading="lazy"
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.opacity = '1';
                  }}
                />
              </Parallax>
              <Parallax speed={2} className="timeline-text">
                <div className="timeline-date">{milestone.date}</div>
                <h3 className="timeline-title">{milestone.title}</h3>
                <p className="timeline-description">{milestone.description}</p>
              </Parallax>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
