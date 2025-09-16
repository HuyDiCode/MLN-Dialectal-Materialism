import { Parallax } from "react-scroll-parallax";
import TimelineItem from "./TimelineItem";
import { timelineData } from "../data/timelineData";
import "./TimelineSection.css";

const TimelineSection: React.FC = () => {
  return (
    <section id='timeline-section' className='timeline-section'>
      <div className='timeline-header'>
        <Parallax speed={-2}>
          <h2 className='timeline-title'>Our Journey</h2>
        </Parallax>
        <Parallax speed={-1}>
          <p className='timeline-subtitle'>
            Follow our path of innovation, growth, and transformative moments
            that shaped our revolutionary approach to dialectical materialism.
          </p>
        </Parallax>
      </div>

      <div className='timeline-container'>
        {timelineData.map((milestone, index) => (
          <TimelineItem
            key={milestone.id}
            milestone={milestone}
            index={index}
          />
        ))}
      </div>

      <Parallax speed={-1} className='timeline-footer'>
        <div className='timeline-conclusion'>
          <h3>The Journey Continues</h3>
          <p>
            Every milestone marks not an end, but a beginning. As we move
            forward, we carry with us the lessons learned and the vision that
            drives us toward an even brighter future.
          </p>
        </div>
      </Parallax>
    </section>
  );
};

export default TimelineSection;
