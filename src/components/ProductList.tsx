import React, { useState } from 'react';
import { Product } from '../types';
import { Package } from 'lucide-react';
import { getCategoryIcon } from '../data/productCategories';

interface Props {
  products: Product[];
}

export const ProductList: React.FC<Props> = ({ products }) => {
  const [sortBy, setSortBy] = useState<'name' | 'carbon'>('carbon');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortOrder === 'asc'
        ? a.carbonFootprint - b.carbonFootprint
        : b.carbonFootprint - a.carbonFootprint;
    }
  });

  const toggleSort = (field: 'name' | 'carbon') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-800">
            Products Detected ({products.length})
          </h3>
        </div>

        {/* Sort Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => toggleSort('name')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              sortBy === 'name'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => toggleSort('carbon')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              sortBy === 'carbon'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Carbon {sortBy === 'carbon' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Quantity</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Carbon (kg CO₂e)</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, idx) => {
              const totalCarbon = products.reduce((sum, p) => sum + p.carbonFootprint, 0);
              const percentage = (product.carbonFootprint / totalCarbon) * 100;
              
              return (
                <tr 
                  key={idx} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-800">{product.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                      {getCategoryIcon(product.category)} {product.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {product.quantity} {product.unit}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-semibold text-green-600">
                      {product.carbonFootprint.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-300 font-bold">
              <td className="py-3 px-4" colSpan={3}>Total</td>
              <td className="py-3 px-4 text-right text-green-600">
                {products.reduce((sum, p) => sum + p.carbonFootprint, 0).toFixed(2)}
              </td>
              <td className="py-3 px-4 text-right">100%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
