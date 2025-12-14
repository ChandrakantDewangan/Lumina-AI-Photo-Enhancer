import React, { useState, useRef, useEffect } from 'react';
import { Download, MoveHorizontal } from 'lucide-react';
import { Button } from './Button';

interface ComparisonSliderProps {
  original: string; // Base64 or URL
  enhanced: string; // Base64 or URL
  onReset: () => void;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ original, enhanced, onReset }) => {
  const [sliderValue, setSliderValue] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  // Handle resizing to keep aspect ratio correct
  useEffect(() => {
    const updateHeight = () => {
        if (containerRef.current) {
            // We measure width and assume a standard aspect or just let the image dictate height
            // But since images are absolute, we need to set container height explicitly based on the image's natural aspect
            // For simplicity in this demo, we'll let the CSS aspect-ratio or max-height handle it, 
            // but usually we need to wait for image load.
            // Here we will use a simpler approach: relative container with images.
        }
    };
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = enhanced;
    link.download = `lumina-enhanced-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Enhancement Result</h2>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onReset} className="text-sm py-2">
            Upload New
          </Button>
          <Button onClick={handleDownload} className="text-sm py-2">
            <Download className="w-4 h-4" /> Download
          </Button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-xl shadow-2xl shadow-black/50 select-none group border border-slate-700 bg-slate-900"
        style={{ minHeight: '300px' }}
      >
        {/* Background (Enhanced - visible on right) */}
        <img 
          src={enhanced} 
          alt="Enhanced" 
          className="w-full h-auto block object-contain mx-auto"
          style={{ maxHeight: '80vh' }}
        />

        {/* Foreground (Original - clipped) */}
        <div 
          className="absolute top-0 left-0 bottom-0 w-full overflow-hidden"
          style={{ 
            clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)` 
          }}
        >
          <img 
            src={original} 
            alt="Original" 
            className="w-full h-full object-contain mx-auto" 
          />
          <div className="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-md">
            Before
          </div>
        </div>
        
        <div className="absolute top-4 right-4 bg-indigo-600/80 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-md">
          After
        </div>

        {/* Slider Handle Line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10"
          style={{ left: `${sliderValue}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200 text-indigo-600">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Invisible Input Range for Interaction */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0 p-0"
        />
      </div>
      
      <p className="text-center text-slate-500 mt-4 text-sm">
        Drag the slider to compare original vs enhanced version
      </p>
    </div>
  );
};