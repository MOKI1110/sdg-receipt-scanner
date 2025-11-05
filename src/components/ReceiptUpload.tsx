import React, { useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface Props {
  onImageSelect: (file: File) => void;
  loading?: boolean;
}

export const ReceiptUpload: React.FC<Props> = ({ onImageSelect, loading = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Pass to parent
    onImageSelect(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className="relative"
      >
        <input
          type="file"
          id="receipt-upload"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          disabled={loading}
        />
        <label
          htmlFor="receipt-upload"
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
            dragActive
              ? 'border-green-500 bg-green-50 scale-105'
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {preview ? (
            <div className="relative w-full h-full p-4">
              <img
                src={preview}
                alt="Receipt preview"
                className="w-full h-full object-contain rounded"
              />
              {!loading && (
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all rounded flex items-center justify-center">
                  <p className="text-white opacity-0 hover:opacity-100 transition-opacity">
                    Click to change
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                  <p className="text-sm text-gray-700 font-medium">Processing receipt...</p>
                  <p className="text-xs text-gray-500 mt-2">This may take 10-30 seconds</p>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 mb-4 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-700">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    Shopping receipt image (PNG, JPG, JPEG)
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                    <p className="text-xs text-gray-500">
                      Clear, well-lit photos work best
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </label>
      </form>

      {/* Tips Section */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">📸 Tips for best results:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Ensure receipt is well-lit and in focus</li>
          <li>• Include the entire receipt in the frame</li>
          <li>• Avoid shadows and glare</li>
          <li>• Flatten creases for better text recognition</li>
        </ul>
      </div>
    </div>
  );
};
