import React from 'react';
import { Leaf, Target } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                SDG Receipt Scanner
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Track your shopping carbon footprint instantly
              </p>
            </div>
          </div>

          {/* SDG Badges */}
          <div className="flex gap-2 items-center">
            <Target className="w-5 h-5 text-gray-500" />
            <div className="flex gap-2">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                SDG 12
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                SDG 13
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                SDG 3
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
