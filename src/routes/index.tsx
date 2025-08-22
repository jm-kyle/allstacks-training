import { createFileRoute } from '@tanstack/react-router';
import { useState, useCallback } from 'react';
import VimeoPlayer from '../components/VimeoPlayer';
import TimestampTag from '../components/TimestampTag';

export const Route = createFileRoute('/')({
  component: App,
});

interface Timestamp {
  time: number;
  label: string;
}

function App() {
  const [currentTime, setCurrentTime] = useState<number | undefined>();
  const [activeTimestamp, setActiveTimestamp] = useState<number | null>(null);

  // Video component timestamps (52 minutes total)
  const timestamps: Timestamp[] = [
    { time: 0, label: 'Page Headers' },
    { time: 142, label: 'Accordion' },
    { time: 284, label: 'Bento Box' },
    { time: 426, label: 'Buttons' },
    { time: 568, label: 'Call to Action' },
    { time: 710, label: 'Card Grid' },
    { time: 852, label: 'Cards' },
    { time: 994, label: 'General Content' },
    { time: 1136, label: 'Heading Title' },
    { time: 1278, label: 'List Section' },
    { time: 1420, label: 'Logo Slider' },
    { time: 1562, label: 'Overview Content' },
    { time: 1704, label: 'Product Features' },
    { time: 1846, label: 'Pricing Table' },
    { time: 1988, label: 'Tiers' },
    { time: 2130, label: 'Quotes' },
    { time: 2272, label: 'Section' },
    { time: 2414, label: 'Section Integration' },
    { time: 2556, label: 'Single Quotes' },
    { time: 2698, label: 'Table' },
    { time: 2840, label: 'Tab Section' },
    { time: 2982, label: 'Two Column Section' },
  ];

  const handleTimestampClick = (time: number) => {
    setCurrentTime(time);
    setActiveTimestamp(time);
  };

  const handleVideoTimeUpdate = useCallback((time: number) => {
    // Find the active timestamp based on current video time
    const active = timestamps
      .slice()
      .reverse()
      .find((ts) => time >= ts.time);

    setActiveTimestamp(active ? active.time : null);
  }, [timestamps]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
          Component Training Video
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Learn about all the components available in our library
        </p>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                📚 Table of Contents
              </h2>
              <div className="space-y-2">
                {timestamps.map((timestamp) => (
                  <TimestampTag
                    key={timestamp.time}
                    label={timestamp.label}
                    time={timestamp.time}
                    isActive={activeTimestamp === timestamp.time}
                    onClick={handleTimestampClick}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Video Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <VimeoPlayer
                videoId="1112436578"
                currentTime={currentTime}
                onTimeUpdate={handleVideoTimeUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
