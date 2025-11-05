export const formatCarbonValue = (value: number): string => {
    return value.toFixed(2);
  };
  
  export const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(0)}%`;
  };
  
  export const getCarbonLevel = (carbon: number): {
    level: 'low' | 'medium' | 'high';
    color: string;
    message: string;
  } => {
    if (carbon < 5) {
      return {
        level: 'low',
        color: 'text-green-600',
        message: 'Great! Your shopping has a low carbon footprint.',
      };
    } else if (carbon < 15) {
      return {
        level: 'medium',
        color: 'text-yellow-600',
        message: 'Your shopping has a moderate carbon footprint. Consider greener alternatives.',
      };
    } else {
      return {
        level: 'high',
        color: 'text-red-600',
        message: 'High carbon footprint! Check our suggestions to reduce your impact.',
      };
    }
  };
  
  export const formatCurrency = (value: number): string => {
    return `₹${value.toFixed(2)}`;
  };
  