import React from 'react';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem
} from 'chart.js';
import { Product } from '../types';
import { getCategoryIcon } from '../data/productCategories';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  categoryBreakdown: { [key: string]: number };
  products: Product[];
}

export const ChartDisplay: React.FC<Props> = ({ categoryBreakdown, products }) => {
  const categories = Object.keys(categoryBreakdown);
  const values = Object.values(categoryBreakdown);

  const pieData = {
    labels: categories.map(cat => `${getCategoryIcon(cat)} ${cat}`),
    datasets: [
      {
        data: values,
        backgroundColor: [
          '#10b981', '#ef4444', '#3b82f6', '#f59e0b',
          '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Carbon Footprint (kg CO₂e)',
        data: values,
        backgroundColor: '#10b981',
        borderRadius: 8,
      },
    ],
  };

  const topProducts = [...products]
    .sort((a, b) => b.carbonFootprint - a.carbonFootprint)
    .slice(0, 5);

  const topProductsData = {
    labels: topProducts.map(p => p.name),
    datasets: [
      {
        data: topProducts.map(p => p.carbonFootprint),
        backgroundColor: ['#ef4444', '#f59e0b', '#eab308', '#84cc16', '#10b981'],
        borderWidth: 0,
      },
    ],
  };

  // === Bar options (ChartOptions<'bar'>) ===
  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: string | number) => `${value} kg`,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'bar'>) => {
            // For bar charts tooltipItem.parsed may be number or { x, y }
            const parsed = tooltipItem.parsed;
            const value = (typeof parsed === 'number' ? parsed : parsed?.y ?? 0);
            const label = tooltipItem.label ?? tooltipItem.dataset.label ?? '';
            return `${label}: ${value.toFixed(2)} kg CO₂e`;
          },
        },
      },
    },
  };

  // === Pie options (ChartOptions<'pie'>) ===
  const pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'pie'>) => {
            // For pie/doughnut tooltipItem.parsed is a number
            const value = (tooltipItem.parsed as number) ?? 0;
            const label = tooltipItem.label ?? '';
            return `${label}: ${value.toFixed(2)} kg CO₂e`;
          },
        },
      },
    },
  };

  // === Doughnut options (ChartOptions<'doughnut'>) ===
  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'doughnut'>) => {
            const value = (tooltipItem.parsed as number) ?? 0;
            const label = tooltipItem.label ?? '';
            return `${label}: ${value.toFixed(2)} kg CO₂e`;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Carbon Footprint Analysis
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Category Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Carbon by Category</h3>
          <div className="h-64">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Top 5 High-Impact Products</h3>
        <div className="max-w-md mx-auto h-64 flex items-center justify-center">
          <Doughnut data={topProductsData} options={doughnutOptions} />
        </div>
        <p className="text-sm text-gray-600 text-center mt-4">
          Focus on replacing these items for maximum carbon reduction
        </p>
      </div>
    </div>
  );
};
