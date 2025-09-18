import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import HeroSection from "./components/HeroSection";
import TimelineSection from "./components/TimelineSection";
import FloatingNav from "./components/FloatingNav";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div className='min-h-screen w-full bg-white relative'>
        {/* Purple Gradient Grid Background for entire website */}
        <div
          className='fixed inset-0 z-0'
          style={{
            backgroundImage: `
              linear-gradient(to right, #f0f0f0 1px, transparent 1px),
              linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
              radial-gradient(circle 800px at 0% 200px, #d5c5ff, transparent)
            `,
            backgroundSize: "96px 64px, 96px 64px, 100% 100%",
          }}
        />

        {/* Content with relative positioning */}
        <div className='relative z-10'>
          <HeroSection />
          <TimelineSection />
          <FloatingNav />
        </div>
      </div>
    </>
  );
}

export default App;
