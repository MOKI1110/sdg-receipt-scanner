import { useState } from 'react';
import { extractTextFromImage, parseReceiptText } from '../utils/ocrUtils';
import { matchProducts } from '../utils/productMatcher';
import { calculateCarbonFootprint } from '../utils/carbonCalculations';
import { CarbonResult } from '../types';

export const useOCR = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CarbonResult | null>(null);

  const processReceipt = async (file: File) => {
    setLoading(true);
    setError(null);
    
    try {
      // Extract text from image
      const text = await extractTextFromImage(file);
      
      // Parse receipt text
      const productLines = parseReceiptText(text);
      
      if (productLines.length === 0) {
        throw new Error('No products detected in receipt. Please try a clearer image.');
      }
      
      // Match products with carbon database
      const products = matchProducts(productLines);
      
      if (products.length === 0) {
        throw new Error('Could not match products with database. Please try another receipt.');
      }
      
      // Calculate carbon footprint
      const carbonResult = calculateCarbonFootprint(products);
      
      setResult(carbonResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('OCR Processing error:', err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { loading, error, result, processReceipt, reset };
};
