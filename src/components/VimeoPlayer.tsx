import { useRef, useEffect, useState } from 'react';
import Player from '@vimeo/player';

interface VimeoPlayerProps {
  videoId: string;
  currentTime?: number;
  onTimeUpdate?: (time: number) => void;
}

export default function VimeoPlayer({
  videoId,
  currentTime,
  onTimeUpdate,
}: VimeoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Vimeo player
    playerRef.current = new Player(containerRef.current, {
      id: parseInt(videoId),
      width: 800,
      height: 450,
      responsive: true,
    });

    // Set up event listeners
    playerRef.current.ready().then(() => {
      setIsReady(true);
    });

    // Listen for time updates
    if (onTimeUpdate) {
      playerRef.current.on('timeupdate', (data: { seconds: number }) => {
        onTimeUpdate(data.seconds);
      });
    }

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]); // Removed onTimeUpdate from dependencies

  // Jump to specific time when currentTime prop changes
  useEffect(() => {
    if (playerRef.current && currentTime !== undefined && isReady) {
      playerRef.current.setCurrentTime(currentTime).catch(console.error);
    }
  }, [currentTime, isReady]);

  return (
    <div className="w-full mx-auto">
      <div
        ref={containerRef}
        className="w-full aspect-video rounded-lg overflow-hidden shadow-lg"
      />
    </div>
  );
}
