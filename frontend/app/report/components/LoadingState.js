"use client";
import { useEffect, useState } from 'react';
import { Progress } from './CommonComponents';

const LoadingState = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalTime = 15000;
    const interval = 100;
    const incrementValue = (interval / totalTime) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const remaining = 98 - prev;
        const increment = (remaining / 100) * incrementValue;
        return Math.min(prev + increment, 98);
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 98) {
      const timeout = setTimeout(() => {
        setProgress(99);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="w-3/4 h-8 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4"></div>
          <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-6 mb-12">
          <div className="text-center space-y-3">
            <Progress value={progress} />
            <p className="text-gray-700 font-medium">
              Analyzing your STEM profile... {Math.round(progress)}%
            </p>
            {progress === 99 && (
              <p className="text-gray-500 text-sm animate-pulse">
                Almost there...
              </p>
            )}
            {progress < 99 && (
              <p className="text-gray-500 text-sm">
                Estimated time remaining: {Math.ceil((100 - progress) * 0.15)} seconds
              </p>
            )}
          </div>
        </div>

        {/* Placeholder cards */}
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
