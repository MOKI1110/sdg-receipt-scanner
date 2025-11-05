import { carbonDatabase } from '../data/carbonDatabase';
import { Product } from '../types';

// Helper function to convert units to base units
const convertToBaseUnit = (quantity: number, unit: string): { quantity: number; unit: string } => {
  const unitLower = unit.toLowerCase().trim();
  
  if (unitLower === 'g' || unitLower === 'gm' || unitLower === 'gram' || unitLower === 'grams') {
    return { quantity: quantity / 1000, unit: 'kg' };
  }
  
  if (unitLower === 'ml' || unitLower === 'milliliter' || unitLower === 'milliliters') {
    return { quantity: quantity / 1000, unit: 'L' };
  }
  
  if (unitLower === 'dozen' || unitLower === 'doz') {
    return { quantity: quantity * 12, unit: 'pcs' };
  }
  
  if (unitLower === 'l' || unitLower === 'ltr' || unitLower === 'litre' || unitLower === 'liter') {
    return { quantity, unit: 'L' };
  }
  
  if (unitLower === 'kg' || unitLower === 'kgs' || unitLower === 'kilogram' || unitLower === 'kilograms') {
    return { quantity, unit: 'kg' };
  }
  
  if (unitLower === 'pc' || unitLower === 'pcs' || unitLower === 'piece' || unitLower === 'pieces') {
    return { quantity, unit: 'pcs' };
  }
  
  if (unitLower === 'unit' || unitLower === 'units' || unitLower === 'bottle' || unitLower === 'bottles') {
    return { quantity, unit: 'unit' };
  }
  
  return { quantity, unit: unitLower };
};

// Helper to normalize product names (handle plurals, case)
const normalizeProductName = (name: string): string => {
  const normalized = name.toLowerCase().trim();
  
  const pluralMap: { [key: string]: string } = {
    'eggs': 'egg',
    'tomatoes': 'tomato',
    'potatoes': 'potato',
    'apples': 'apple',
    'bananas': 'banana',
    'onions': 'onion',
    'carrots': 'carrot',
    'oranges': 'orange',
    'grapes': 'grape',
    'mangoes': 'mango',
    'chickens': 'chicken',
  };
  
  return pluralMap[normalized] || normalized;
};

export const matchProducts = (extractedLines: string[]): Product[] => {
  const matchedProducts: Product[] = [];
  const seenProducts = new Set<string>();

  console.log('🔍 Matching products from Vision API output...');

  extractedLines.forEach(line => {
    const lineLower = line.toLowerCase();
    
    for (const entry of carbonDatabase) {
      const normalizedLine = normalizeProductName(lineLower);
      const normalizedProduct = normalizeProductName(entry.product);
      
      if (normalizedLine.includes(normalizedProduct) || lineLower.includes(entry.product)) {
        
        // Prevent duplicate matching
        const productKey = `${entry.product}-${line}`;
        if (seenProducts.has(productKey)) {
          continue;
        }
        
        let quantity = 1;
        let unit = entry.unit;
        
        // ========================================
        // SIMPLIFIED EXTRACTION (Vision API gives clean format)
        // ========================================
        
        // Vision API format: "ProductName quantity unit"
        // Example: "Milk 2 L", "Chicken 1.2 kg"
        
        // Match: number followed by unit
        const quantityWithUnit = line.match(/(\d+\.?\d*)\s*(kg|kgs|g|gm|grams?|l|ltr|litre|ml|milliliters?|dozen|doz|pcs?|piece|pieces|unit|units|bottle|bottles)\b/i);
        
        if (quantityWithUnit) {
          quantity = parseFloat(quantityWithUnit[1]);
          unit = quantityWithUnit[2];
        }
        
        // Convert to base unit
        const converted = convertToBaseUnit(quantity, unit);
        quantity = converted.quantity;
        unit = converted.unit;
        
        // ========================================
        // SANITY CHECKS
        // ========================================
        const maxReasonableQty: { [key: string]: number } = {
          'kg': 50,      // Allow bulk purchases
          'L': 20,       // Allow bulk liquids
          'unit': 15,    // Allow multiple bottles
          'pcs': 50,     // Allow multiple dozens
        };
        
        if (maxReasonableQty[unit] && quantity > maxReasonableQty[unit]) {
          console.warn(`⚠️ Skipping ${entry.product}: quantity ${quantity} ${unit} exceeds reasonable limit`);
          continue;
        }
        
        // Get carbon factor from database
        const carbonPerUnit = entry.carbonPerUnit;
        
        // Ensure unit consistency with database
        if (entry.unit === 'pcs' && unit === 'unit') {
          unit = 'pcs';
        } else if (entry.unit === 'unit' && unit === 'pcs') {
          unit = 'unit';
        } else if (entry.unit === 'bottle' && unit === 'unit') {
          unit = 'bottle';
        }
        
        // Calculate carbon footprint
        const carbonFootprint = quantity * carbonPerUnit;
        
        console.log(`✅ Matched: ${entry.product} | Line: "${line}" | Qty: ${quantity} ${unit} | Carbon: ${carbonFootprint.toFixed(2)} kg CO₂e`);
        
        matchedProducts.push({
          name: entry.product.charAt(0).toUpperCase() + entry.product.slice(1),
          quantity: quantity,
          unit: unit,
          carbonFootprint: carbonFootprint,
          category: entry.category
        });
        
        seenProducts.add(productKey);
        break; // Stop after first match
      }
    }
  });

  console.log(`📊 Total products matched: ${matchedProducts.length}`);
  return matchedProducts;
};
