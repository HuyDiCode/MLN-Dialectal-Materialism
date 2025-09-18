import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
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
    <div className='fixed inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center z-50'>
      <div className='text-center text-white'>
        <div className='relative mb-8'>
          <div className='w-24 h-24 rounded-full border-4 border-white/20 mx-auto'></div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-2xl font-bold text-white'>DM</div>
          </div>
        </div>

        <h2 className='text-4xl font-bold mb-4'>Dialectical Materialism</h2>
        <p className='text-xl text-blue-200 mb-8'>
          Preparing your journey through revolutionary ideas
        </p>

        <div className='w-80 h-2 bg-white/20 rounded-full mx-auto mb-4 overflow-hidden'>
          <div
            className='h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300 ease-out'
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>

        <div className='text-lg font-semibold'>{loadingProgress}%</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
