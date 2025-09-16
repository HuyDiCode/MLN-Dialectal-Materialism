import { useState } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import LoadingScreen from "./components/LoadingScreen";
import HeroSection from "./components/HeroSection";
import TimelineSection from "./components/TimelineSection";
import FloatingNav from "./components/FloatingNav";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <ParallaxProvider>
        <div className='app'>
          <HeroSection />
          <TimelineSection />
          <FloatingNav />
        </div>
      </ParallaxProvider>
    </>
  );
}

export default App;
