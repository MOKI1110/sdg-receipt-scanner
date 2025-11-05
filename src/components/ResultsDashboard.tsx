import React from 'react';
import { CarbonResult } from '../types';
import { CarbonCalculator } from './CarbonCalculator';
import { ChartDisplay } from './ChartDisplay';
import { ProductList } from '../components/ProductList';
import { AlternativeSuggestions } from '../components/AlternativeSuggestions';
import { SDGMapping } from './SDGMapping';
import { getCarbonComparison } from '../utils/carbonCalculations';
import { RotateCcw } from 'lucide-react';

interface Props {
  result: CarbonResult;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<Props> = ({ result, onReset }) => {
  const comparison = getCarbonComparison(result.totalCarbon);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Carbon Calculator Section */}
      <CarbonCalculator totalCarbon={result.totalCarbon} comparison={comparison} />

      {/* Charts Section */}
      <ChartDisplay categoryBreakdown={result.categoryBreakdown} products={result.products} />

      {/* Products List */}
      <ProductList products={result.products} />

      {/* Alternatives Section */}
      {result.alternatives.length > 0 && (
        <AlternativeSuggestions alternatives={result.alternatives} />
      )}

      {/* SDG Mapping Section */}
      <SDGMapping sdgImpact={result.sdgImpact} />

      {/* Reset Button */}
      <div className="text-center pb-8">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <RotateCcw className="w-5 h-5" />
          Scan Another Receipt
        </button>
      </div>
    </div>
  );
};
