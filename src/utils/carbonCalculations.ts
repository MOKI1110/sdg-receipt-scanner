import { Product, CarbonResult, Alternative } from '../types';
import { carbonDatabase } from '../data/carbonDatabase';
import { sdgMappings } from '../data/sdgData';

export const calculateCarbonFootprint = (products: Product[]): CarbonResult => {
  const totalCarbon = products.reduce((sum, p) => sum + p.carbonFootprint, 0);

  // Category breakdown
  const categoryBreakdown: { [key: string]: number } = {};
  products.forEach(p => {
    categoryBreakdown[p.category] = (categoryBreakdown[p.category] || 0) + p.carbonFootprint;
  });

  // Generate alternatives
  const alternatives: Alternative[] = [];
  products.forEach(product => {
    const dbEntry = carbonDatabase.find(
      entry => entry.product.toLowerCase() === product.name.toLowerCase()
    );

    if (dbEntry && dbEntry.alternatives && dbEntry.alternatives.length > 0) {
      const altEntry = carbonDatabase.find(
        entry => entry.product === dbEntry.alternatives![0]
      );

      if (altEntry) {
        const carbonSaved = product.carbonFootprint - (product.quantity * altEntry.carbonPerUnit);
        if (carbonSaved > 0) {
          alternatives.push({
            original: product.name,
            suggestion: dbEntry.alternatives[0],
            carbonSaved: carbonSaved,
            reason: `Lower carbon footprint by ${((carbonSaved / product.carbonFootprint) * 100).toFixed(0)}%`
          });
        }
      } else {
        alternatives.push({
          original: product.name,
          suggestion: dbEntry.alternatives[0],
          carbonSaved: product.carbonFootprint * 0.3, // Estimate 30% savings
          reason: 'More sustainable alternative available'
        });
      }
    }
  });

  return {
    totalCarbon,
    products,
    categoryBreakdown,
    alternatives,
    sdgImpact: sdgMappings
  };
};

export const getCarbonComparison = (totalCarbon: number) => {
  return {
    trees: (totalCarbon / 21).toFixed(1), // 1 tree absorbs ~21kg CO2/year
    cars: (totalCarbon / 4600).toFixed(3), // Average car emits ~4600kg CO2/year
    flights: (totalCarbon / 90).toFixed(2) // Short flight ~90kg CO2
  };
};
