import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  onLoaded: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onLoaded }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const hasSeenSplashScreen = sessionStorage.getItem('hasSeenSplashScreen');

    if (hasSeenSplashScreen) {
      setIsVisible(false); // Skip splash screen if it has been seen
      onLoaded(); // Call the onLoaded handler immediately
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenSplashScreen', 'true'); // Set flag in sessionStorage
        onLoaded();
      }, 2000); // Show splash screen for 2 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [onLoaded]);

  if (!isVisible) {
    return null; // Don't render anything if not visible
  }

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="animate-fadeInOut">
        <Image
          src="/images/app-logo.png"
          alt="Social Sphere Logo"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
