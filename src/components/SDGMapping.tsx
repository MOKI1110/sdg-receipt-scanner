import React from 'react';
import { SDGImpact } from '../types';
import { Target, CheckCircle } from 'lucide-react';

interface Props {
  sdgImpact: SDGImpact[];
}

export const SDGMapping: React.FC<Props> = ({ sdgImpact }) => {
  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getSDGColor = (sdgNumber: number) => {
    const colors: { [key: number]: string } = {
      2: 'bg-amber-500',
      3: 'bg-emerald-500',
      12: 'bg-orange-500',
      13: 'bg-green-600',
    };
    return colors[sdgNumber] || 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-6 h-6 text-blue-600" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            UN Sustainable Development Goals Impact
          </h3>
          <p className="text-sm text-gray-600">
            How this project contributes to global sustainability
          </p>
        </div>
      </div>

      {/* SDG Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {sdgImpact.map((sdg, idx) => (
          <div 
            key={idx}
            className="border-2 border-gray-200 rounded-lg p-5 hover:border-green-300 hover:shadow-md transition-all"
          >
            {/* SDG Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className={`${getSDGColor(sdg.sdgNumber)} text-white rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0`}>
                <div className="text-center">
                  <div className="text-2xl font-bold">{sdg.sdgNumber}</div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-800 mb-1">
                  SDG {sdg.sdgNumber}
                </h4>
                <p className="text-sm font-medium text-gray-700">
                  {sdg.sdgName}
                </p>
              </div>
            </div>

            {/* Relevance */}
            <div className="mb-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                {sdg.relevance}
              </p>
            </div>

            {/* Impact Badge */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase">
                Impact Level
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getImpactColor(sdg.impact)}`}>
                {sdg.impact.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Systems Thinking Section */}
      <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
        <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Systems Thinking & Interconnections
        </h4>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            🔗 <span className="font-medium">Consumer Behavior</span> → Reduced demand for high-carbon products → Lower production emissions
          </p>
          <p>
            🔗 <span className="font-medium">Market Signals</span> → Retailers stock more sustainable alternatives → Industry transformation
          </p>
          <p>
            🔗 <span className="font-medium">Health Benefits</span> → Plant-based choices → Improved nutrition → SDG 3 (Good Health)
          </p>
          <p>
            🔗 <span className="font-medium">Local Economy</span> → Local produce → Supports farmers → SDG 2 (Zero Hunger)
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm mb-3">
          Learn more about the UN Sustainable Development Goals
        </p>
        <a
          href="https://sdgs.un.org/goals"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Visit UN SDG Website →
        </a>
      </div>
    </div>
  );
};
