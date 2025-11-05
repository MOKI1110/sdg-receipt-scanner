import { CarbonDataEntry } from '../types';

export const carbonDatabase: CarbonDataEntry[] = [
  // Dairy & Eggs
  { product: 'milk', category: 'Dairy', carbonPerUnit: 1.9, unit: 'L', alternatives: ['soy milk', 'almond milk'] },
  { product: 'cheese', category: 'Dairy', carbonPerUnit: 13.5, unit: 'kg', alternatives: ['plant-based cheese'] },
  { product: 'butter', category: 'Dairy', carbonPerUnit: 12.1, unit: 'kg', alternatives: ['plant butter'] },
  { product: 'eggs', category: 'Dairy', carbonPerUnit: 0.4, unit: 'pcs', alternatives: ['plant-based egg substitute'] }, // ~0.4 per egg
  { product: 'yogurt', category: 'Dairy', carbonPerUnit: 2.2, unit: 'kg', alternatives: ['soy yogurt'] },

  // Meat & Poultry
  { product: 'beef', category: 'Meat', carbonPerUnit: 27.0, unit: 'kg', alternatives: ['chicken', 'lentils'] },
  { product: 'lamb', category: 'Meat', carbonPerUnit: 39.2, unit: 'kg', alternatives: ['chicken', 'chickpeas'] },
  { product: 'pork', category: 'Meat', carbonPerUnit: 12.1, unit: 'kg', alternatives: ['chicken', 'tofu'] },
  { product: 'chicken', category: 'Meat', carbonPerUnit: 6.9, unit: 'kg', alternatives: ['lentils', 'mushrooms'] },
  { product: 'fish', category: 'Meat', carbonPerUnit: 5.4, unit: 'kg' },

  // Grains & Cereals
  { product: 'rice', category: 'Grains', carbonPerUnit: 2.7, unit: 'kg', alternatives: ['quinoa', 'millets'] },
  { product: 'wheat', category: 'Grains', carbonPerUnit: 1.4, unit: 'kg' },
  { product: 'bread', category: 'Grains', carbonPerUnit: 1.3, unit: 'kg', alternatives: ['homemade bread'] },
  { product: 'pasta', category: 'Grains', carbonPerUnit: 1.5, unit: 'kg' },
  { product: 'oats', category: 'Grains', carbonPerUnit: 2.5, unit: 'kg' },

  // Vegetables (Local)
  { product: 'tomato', category: 'Vegetables', carbonPerUnit: 1.1, unit: 'kg' },
  { product: 'potato', category: 'Vegetables', carbonPerUnit: 0.3, unit: 'kg' },
  { product: 'onion', category: 'Vegetables', carbonPerUnit: 0.4, unit: 'kg' },
  { product: 'carrot', category: 'Vegetables', carbonPerUnit: 0.4, unit: 'kg' },
  { product: 'cabbage', category: 'Vegetables', carbonPerUnit: 0.5, unit: 'kg' },
  { product: 'cauliflower', category: 'Vegetables', carbonPerUnit: 0.6, unit: 'kg' },
  { product: 'spinach', category: 'Vegetables', carbonPerUnit: 0.7, unit: 'kg' },
  { product: 'broccoli', category: 'Vegetables', carbonPerUnit: 0.8, unit: 'kg' },

  // Fruits
  { product: 'apple', category: 'Fruits', carbonPerUnit: 0.4, unit: 'kg' },
  { product: 'banana', category: 'Fruits', carbonPerUnit: 0.7, unit: 'kg' },
  { product: 'orange', category: 'Fruits', carbonPerUnit: 0.4, unit: 'kg' },
  { product: 'mango', category: 'Fruits', carbonPerUnit: 0.8, unit: 'kg' },
  { product: 'grapes', category: 'Fruits', carbonPerUnit: 1.5, unit: 'kg', alternatives: ['local seasonal fruits'] },

  // Beverages
  { product: 'coffee', category: 'Beverages', carbonPerUnit: 16.5, unit: 'kg', alternatives: ['tea'] },
  { product: 'tea', category: 'Beverages', carbonPerUnit: 6.2, unit: 'kg' },
  { product: 'cola', category: 'Beverages', carbonPerUnit: 0.3, unit: 'L', alternatives: ['homemade drinks'] },
  { product: 'juice', category: 'Beverages', carbonPerUnit: 1.2, unit: 'L', alternatives: ['fresh juice'] },

  // Packaged Foods
  { product: 'chips', category: 'Snacks', carbonPerUnit: 3.5, unit: 'kg', alternatives: ['homemade snacks'] },
  { product: 'biscuits', category: 'Snacks', carbonPerUnit: 2.8, unit: 'kg', alternatives: ['homemade cookies'] },
  { product: 'chocolate', category: 'Snacks', carbonPerUnit: 18.7, unit: 'kg', alternatives: ['dark chocolate'] },
  { product: 'sugar', category: 'Staples', carbonPerUnit: 3.2, unit: 'kg', alternatives: ['jaggery', 'honey'] },
  { product: 'oil', category: 'Staples', carbonPerUnit: 2.8, unit: 'L' }, // support "sunflower oil"

  // Household & Personal Care
  { product: 'shampoo', category: 'Personal Care', carbonPerUnit: 1.2, unit: 'bottle', alternatives: ['bar shampoo'] }, // If your matcher supports "unit"/"bottle" for 200ml
  { product: 'dishwashing liquid', category: 'Cleaning', carbonPerUnit: 1.5, unit: 'L', alternatives: ['eco detergent'] }, // per liter for 500ml on receipt
  { product: 'soap', category: 'Personal Care', carbonPerUnit: 0.4, unit: 'unit' },
  { product: 'detergent', category: 'Cleaning', carbonPerUnit: 2.5, unit: 'kg', alternatives: ['eco detergent'] },
  { product: 'toothpaste', category: 'Personal Care', carbonPerUnit: 0.8, unit: 'unit', alternatives: ['tooth powder'] },
];
