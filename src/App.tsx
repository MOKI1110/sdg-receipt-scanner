import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ReceiptUpload } from './components/ReceiptUpload';
import { OCRProcessor } from './components/OCRProcessor';
import { ResultsDashboard } from './components/ResultsDashboard';
import { extractTextFromImage, parseReceiptText } from './utils/ocrUtils';
import { matchProducts } from './utils/productMatcher';
import { calculateCarbonFootprint } from './utils/carbonCalculations';
import { CarbonResult } from './types';
import { Leaf } from 'lucide-react';

type ProcessingStatus = 'idle' | 'processing' | 'success' | 'error';

function App() {
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<CarbonResult | null>(null);

  const handleImageSelect = async (file: File) => {
    setStatus('processing');
    setProgress(10);
    setMessage('Preparing image for AI analysis...');
    setResult(null);

    try {
      // Step 1: Extract text using Vision API (10-50%)
      setMessage('🤖 Using NVIDIA Nemotron Vision AI to read receipt...');
      const text = await extractTextFromImage(file);
      setProgress(50);
      setMessage('✅ Receipt analyzed successfully!');

      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 300));

      // Step 2: Parse receipt (50-60%)
      setMessage('📋 Parsing extracted products...');
      const productLines = parseReceiptText(text);
      setProgress(60);

      if (productLines.length === 0) {
        throw new Error('No products detected in receipt. Please upload a clearer image with visible text.');
      }

      console.log(`📦 Found ${productLines.length} products to analyze`);

      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 300));

      // Step 3: Match products with carbon database (60-80%)
      setMessage(`🔍 Matching ${productLines.length} products with carbon database...`);
      const products = matchProducts(productLines);
      setProgress(80);

      if (products.length === 0) {
        throw new Error('Could not match any products with our database. Please try a different receipt or contact support.');
      }

      console.log(`✅ Successfully matched ${products.length} products`);

      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 300));

      // Step 4: Calculate carbon footprint (80-100%)
      setMessage('🌍 Calculating environmental impact...');
      const carbonResult = calculateCarbonFootprint(products);
      setProgress(95);
      setMessage('🎉 Analysis complete!');

      // Final delay before showing results
      await new Promise(resolve => setTimeout(resolve, 500));

      setProgress(100);
      setResult(carbonResult);
      setStatus('success');

      console.log('✅ Carbon footprint analysis completed:', {
        totalCarbon: carbonResult.totalCarbon.toFixed(2),
        productsAnalyzed: products.length,
        alternatives: carbonResult.alternatives.length
      });

    } catch (error) {
      console.error('❌ Processing error:', error);
      setStatus('error');
      
      // Provide user-friendly error messages
      let errorMessage = 'Failed to process receipt. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          errorMessage = '⚠️ API configuration error. Please contact support.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = '🌐 Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('parse') || error.message.includes('JSON')) {
          errorMessage = '📄 Could not process receipt format. Please try a clearer image.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setMessage(errorMessage);
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setProgress(0);
    setMessage('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        {!result ? (
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-block bg-green-100 p-4 rounded-full mb-4">
                <Leaf className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Track Your Shopping Carbon Footprint
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload your shopping receipt and discover the environmental impact of your purchases.
                Get personalized suggestions for greener alternatives aligned with UN SDG Goals.
              </p>
              
              {/* Technology Badge */}
              <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full">
                <span className="text-2xl">🤖</span>
                <span className="text-sm font-medium text-gray-700">
                  Powered by NVIDIA Nemotron Vision AI
                </span>
              </div>
            </div>

            {/* Upload Section */}
            <ReceiptUpload onImageSelect={handleImageSelect} loading={status === 'processing'} />

            {/* Processing Status */}
            {status !== 'idle' && (
              <OCRProcessor status={status} progress={progress} message={message} />
            )}

            {/* Features Section */}
            {status === 'idle' && (
              <div className="mt-16 grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-3">🤖</div>
                  <h3 className="font-semibold text-lg mb-2">AI-Powered Vision</h3>
                  <p className="text-sm text-gray-600">
                    Advanced Vision AI extracts product details with 95%+ accuracy
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🌍</div>
                  <h3 className="font-semibold text-lg mb-2">Carbon Analysis</h3>
                  <p className="text-sm text-gray-600">
                    Calculate environmental impact based on scientific carbon data
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">💡</div>
                  <h3 className="font-semibold text-lg mb-2">Smart Suggestions</h3>
                  <p className="text-sm text-gray-600">
                    Get personalized recommendations for sustainable alternatives
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <ResultsDashboard result={result} onReset={handleReset} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
