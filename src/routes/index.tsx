import { createFileRoute } from '@tanstack/react-router';
import { useState, useCallback, useRef } from 'react';
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
  const [isTimestampSectionOpen, setIsTimestampSectionOpen] = useState(true);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Video component timestamps (52 minutes total)
  const timestamps: Timestamp[] = [
    { time: 0, label: 'General Header' },
    { time: 312, label: 'Accordion' },
    { time: 393, label: 'Bento Box' },
    { time: 498, label: 'Buttons' },
    { time: 533, label: 'Call To Action' },
    { time: 633, label: 'Card Grid' },
    { time: 664, label: 'Cards' },
    { time: 720, label: 'General Content' },
    { time: 761, label: 'Heading' },
    { time: 843, label: 'List Section' },
    { time: 865, label: 'Tip For HubSpot Sections' },
    { time: 953, label: 'Logo Slider' },
    { time: 1017, label: 'Overview Content' },
    { time: 1089, label: 'Product Features' },
    { time: 1115, label: 'Tip for Content Formatting' },
    { time: 1175, label: 'Pricing Table' },
    { time: 1247, label: 'Pricing Tiers' },
    { time: 1275, label: 'Quotes' },
    { time: 1305, label: 'Section' },
    { time: 1351, label: 'Integration Section' },
    { time: 1382, label: 'Single Quote' },
    { time: 1418, label: 'Table' },
    { time: 1464, label: 'Tabs Section' },
    { time: 1564, label: 'Two Column' },
    { time: 1641, label: 'Q&A' }
  ];

  const handleTimestampClick = (time: number) => {
    setCurrentTime(time);
    setActiveTimestamp(time);

    // Scroll to video on mobile devices
    if (videoContainerRef.current && window.innerWidth < 1024) { // lg breakpoint
      videoContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
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
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AllStacks Component Library Overview
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Recorded presentation covering all available modules in your component library.
            Jump to specific sections or watch the complete Q&A session at the end.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
            🎥 52-minute recorded session with Q&A
          </div>
        </div>

        {/* Video Content - Full Width */}
        <div ref={videoContainerRef} className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <VimeoPlayer
            videoId="1112436578"
            currentTime={currentTime}
            onTimeUpdate={handleVideoTimeUpdate}
          />
        </div>

        {/* Collapsible Timestamp Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <button
              onClick={() => setIsTimestampSectionOpen(!isTimestampSectionOpen)}
              className="w-full flex items-center justify-between text-left hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors"
            >
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  Session Agenda
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Jump to any section of the recorded presentation or skip to the Q&A
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
                <span className="text-sm font-medium">
                  {isTimestampSectionOpen ? 'Hide' : 'Show'} Sections
                </span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${isTimestampSectionOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isTimestampSectionOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
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
        </div>
      </div>
    </div>
  );
}
