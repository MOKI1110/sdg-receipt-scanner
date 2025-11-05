import React from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  status: 'idle' | 'processing' | 'success' | 'error';
  progress?: number;
  message?: string;
}

export const OCRProcessor: React.FC<Props> = ({ status, progress = 0, message }) => {
  if (status === 'idle') return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-4">
          {/* Icon based on status */}
          {status === 'processing' && (
            <Loader2 className="w-8 h-8 text-green-600 animate-spin flex-shrink-0" />
          )}
          {status === 'success' && (
            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
          )}
          {status === 'error' && (
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
          )}

          {/* Status message */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg">
              {status === 'processing' && 'Processing Receipt...'}
              {status === 'success' && 'Processing Complete!'}
              {status === 'error' && 'Processing Failed'}
            </h3>
            {message && (
              <p className="text-sm text-gray-600 mt-1">{message}</p>
            )}
          </div>
        </div>

        {/* Progress bar for processing */}
        {status === 'processing' && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-right">{progress}%</p>
          </div>
        )}

        {/* Steps indicator */}
        {status === 'processing' && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${progress > 0 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <span className={progress > 0 ? 'text-gray-900' : 'text-gray-500'}>
                Extracting text from image
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${progress > 40 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <span className={progress > 40 ? 'text-gray-900' : 'text-gray-500'}>
                Identifying products
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${progress > 70 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <span className={progress > 70 ? 'text-gray-900' : 'text-gray-500'}>
                Calculating carbon footprint
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
