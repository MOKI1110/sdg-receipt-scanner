export interface Product {
    name: string;
    quantity: number;
    unit: string;
    carbonFootprint: number; // kg CO2e
    category: string;
  }
  
  export interface CarbonResult {
    totalCarbon: number;
    products: Product[];
    categoryBreakdown: { [key: string]: number };
    alternatives: Alternative[];
    sdgImpact: SDGImpact[];
  }
  
  export interface Alternative {
    original: string;
    suggestion: string;
    carbonSaved: number;
    reason: string;
  }
  
  export interface SDGImpact {
    sdgNumber: number;
    sdgName: string;
    relevance: string;
    impact: 'high' | 'medium' | 'low';
  }
  
  export interface CarbonDataEntry {
    product: string;
    category: string;
    carbonPerUnit: number; // kg CO2e per kg/unit
    unit: string;
    alternatives?: string[];
  }
  