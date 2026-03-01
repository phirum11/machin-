import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiCalendar } from 'react-icons/fi';

const SalesChart = ({ data = [], period = 'weekly', onPeriodChange }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1000);
  const chartHeight = 200;

  const getPercentage = (value) => (value / maxValue) * 100;

  const totalSales = data.reduce((sum, d) => sum + d.value, 0);
  const averageSales = data.length > 0 ? totalSales / data.length : 0;
  const previousTotal = totalSales * 0.85; // Simulated previous period
  const trend = ((totalSales - previousTotal) / previousTotal) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Sales Overview</h3>
          <p className="text-sm text-gray-500">Track your sales performance</p>
        </div>
        
        {/* Period selector */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => onPeriodChange?.('daily')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              period === 'daily' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => onPeriodChange?.('weekly')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              period === 'weekly' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => onPeriodChange?.('monthly')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              period === 'monthly' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-500 mb-1">Total Sales</p>
          <p className="text-xl font-bold text-gray-900">${totalSales.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-500 mb-1">Average</p>
          <p className="text-xl font-bold text-gray-900">${averageSales.toFixed(0)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-500 mb-1">Trend</p>
          <div className="flex items-center gap-1">
            {trend >= 0 ? (
              <FiTrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <FiTrendingDown className="w-5 h-5 text-red-500" />
            )}
            <p className={`text-xl font-bold ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative" style={{ height: chartHeight }}>
        <div className="absolute inset-0 flex items-end justify-between gap-2">
          {data.map((item, index) => {
            const height = getPercentage(item.value);
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center group"
              >
                <div className="relative w-full">
                  <div
                    className="bg-blue-500 hover:bg-blue-600 rounded-t transition-all duration-300 group-hover:shadow-lg"
                    style={{ height: `${height}%`, minHeight: '4px' }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ${item.value.toLocaleString()}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[0, 25, 50, 75, 100].map(percent => (
            <div
              key={percent}
              className="absolute w-full border-t border-gray-100"
              style={{ bottom: `${percent}%` }}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Sales</span>
        </div>
        <div className="flex items-center gap-1">
          <FiCalendar className="w-4 h-4" />
          <span>Last 7 days</span>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;