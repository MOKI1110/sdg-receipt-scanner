import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getCarbonLevel } from '../utils/formatters';

interface Props {
  totalCarbon: number;
  comparison: {
    trees: string;
    cars: string;
    flights: string;
  };
}

export const CarbonCalculator: React.FC<Props> = ({ totalCarbon, comparison }) => {
  const carbonLevel = getCarbonLevel(totalCarbon);

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-lg p-8">
      {/* Main Carbon Display */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Your Shopping Carbon Footprint
        </h2>
        <div className="relative inline-block">
          <div className="text-7xl font-bold text-green-600 mb-2">
            {totalCarbon.toFixed(2)}
          </div>
          <p className="text-xl text-gray-600">kg CO₂e</p>
          
          {/* Level indicator */}
          <div className={`mt-4 flex items-center justify-center gap-2 ${carbonLevel.color}`}>
            {carbonLevel.level === 'low' && <TrendingDown className="w-5 h-5" />}
            {carbonLevel.level === 'medium' && <Minus className="w-5 h-5" />}
            {carbonLevel.level === 'high' && <TrendingUp className="w-5 h-5" />}
            <span className="font-semibold uppercase text-sm">
              {carbonLevel.level} Impact
            </span>
          </div>
        </div>
        <p className="text-gray-600 mt-4 max-w-md mx-auto">
          {carbonLevel.message}
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Trees */}
        <div className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-4xl mb-2">🌳</div>
            <p className="text-3xl font-bold text-green-600">{comparison.trees}</p>
            <p className="text-sm text-gray-600 mt-2">
              Trees needed for 1 year to absorb this CO₂
            </p>
          </div>
        </div>

        {/* Cars */}
        <div className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-4xl mb-2">🚗</div>
            <p className="text-3xl font-bold text-blue-600">{comparison.cars}</p>
            <p className="text-sm text-gray-600 mt-2">
              Cars driven for 1 year (average)
            </p>
          </div>
        </div>

        {/* Flights */}
        <div className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-4xl mb-2">✈️</div>
            <p className="text-3xl font-bold text-orange-600">{comparison.flights}</p>
            <p className="text-sm text-gray-600 mt-2">
              Short-haul flights (500 km)
            </p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-white border-l-4 border-green-600 rounded p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">💡 Did you know?</span> The average Indian's annual
          carbon footprint is around 1,900 kg CO₂e. Every small change in shopping habits
          contributes to a sustainable future!
        </p>
      </div>
    </div>
  );
};
