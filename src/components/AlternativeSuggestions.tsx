import React from 'react';
import { Alternative } from '../types';
import { TrendingDown, ArrowRight, Lightbulb } from 'lucide-react';

interface Props {
  alternatives: Alternative[];
}

export const AlternativeSuggestions: React.FC<Props> = ({ alternatives }) => {
  const totalSavings = alternatives.reduce((sum, alt) => sum + alt.carbonSaved, 0);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg p-6 border-2 border-green-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-600 p-2 rounded-lg">
          <TrendingDown className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            Greener Alternatives
          </h3>
          <p className="text-sm text-gray-600">
            Potential savings: <span className="font-bold text-green-600">
              {totalSavings.toFixed(2)} kg CO₂e
            </span>
          </p>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-white rounded-lg p-4 mb-6 border-l-4 border-green-600">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            Small changes make a big difference! Switching to these alternatives could reduce
            your shopping carbon footprint by{' '}
            <span className="font-semibold">
              {((totalSavings / alternatives.reduce((sum, alt) => sum + alt.carbonSaved + (alt.carbonSaved / 0.3), 0)) * 100).toFixed(0)}%
            </span>
          </p>
        </div>
      </div>

      {/* Alternatives Grid */}
      <div className="space-y-4">
        {alternatives.map((alt, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all border border-green-100"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* From -> To */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Current</p>
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded font-medium text-sm">
                    {alt.original}
                  </span>
                </div>
                
                <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Switch to</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded font-medium text-sm">
                    {alt.suggestion}
                  </span>
                </div>
              </div>

              {/* Savings */}
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">
                  -{alt.carbonSaved.toFixed(2)}
                </p>
                <p className="text-xs text-gray-600">kg CO₂e saved</p>
              </div>
            </div>

            {/* Reason */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                💡 <span className="font-medium">Why?</span> {alt.reason}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="mt-6 bg-green-600 text-white rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">If you make all these switches:</p>
            <p className="text-2xl font-bold mt-1">Save {totalSavings.toFixed(2)} kg CO₂e</p>
          </div>
          <div className="text-5xl">🌱</div>
        </div>
      </div>
    </div>
  );
};
