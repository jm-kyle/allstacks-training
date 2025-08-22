import { useRef, useEffect, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  currentTime?: number;
  onTimeUpdate?: (time: number) => void;
}

export default function VideoPlayer({
  src,
  currentTime,
  onTimeUpdate,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Jump to specific time when currentTime prop changes
  useEffect(() => {
    if (videoRef.current && currentTime !== undefined && isReady) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime, isReady]);

  const handleLoadedData = () => {
    setIsReady(true);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && onTimeUpdate) {
      onTimeUpdate(videoRef.current.currentTime);
    }
  };

  return (
    <div className="w-full mx-auto">
      <video
        ref={videoRef}
        src={src}
        controls
        className="w-full h-auto rounded-lg shadow-lg"
        onLoadedData={handleLoadedData}
        onTimeUpdate={handleTimeUpdate}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
