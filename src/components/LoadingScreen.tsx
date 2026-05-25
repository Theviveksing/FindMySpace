import React from 'react';
import { Home } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <Home className="h-12 w-12 text-blue-600 animate-bounce" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-black/10 rounded-full animate-pulse" />
        </div>
        <div className="space-y-2">
          <p className="text-xl font-semibold text-gray-800">Loading FindMySpace</p>
          <p className="text-sm text-gray-600">Please wait while we prepare your experience</p>
        </div>
        <div className="w-24 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <div className="w-full h-full bg-blue-600 rounded-full animate-[loading_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

// Add this to your index.css
/*
@keyframes loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
*/