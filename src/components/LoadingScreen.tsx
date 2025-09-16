import { useState, useEffect } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className={`loading-screen ${isComplete ? 'loading-screen--complete' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo">
          <div className="loading-logo__circle"></div>
          <div className="loading-logo__text">DM</div>
        </div>
        
        <h2 className="loading-title">Dialectical Materialism</h2>
        <p className="loading-subtitle">Preparing your journey through revolutionary ideas</p>
        
        <div className="loading-bar">
          <div 
            className="loading-bar__fill"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        
        <div className="loading-percentage">{loadingProgress}%</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
