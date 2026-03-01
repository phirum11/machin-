import React, { useState } from 'react';
import { FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import SalesChart from '../components/dashboard/SalesChart';
import OrdersTable from '../components/dashboard/OrdersTable';
import DashboardLayout from '../layout/DashboardLayout';

const WEEKLY_DATA = [
  { label: 'Mon', value: 4200 },
  { label: 'Tue', value: 6800 },
  { label: 'Wed', value: 5100 },
  { label: 'Thu', value: 7900 },
  { label: 'Fri', value: 9200 },
  { label: 'Sat', value: 11500 },
  { label: 'Sun', value: 8700 },
];

const MONTHLY_DATA = [
  { label: 'Jan', value: 32000 },
  { label: 'Feb', value: 28000 },
  { label: 'Mar', value: 45000 },
  { label: 'Apr', value: 38000 },
  { label: 'May', value: 52000 },
  { label: 'Jun', value: 61000 },
  { label: 'Jul', value: 55000 },
  { label: 'Aug', value: 67000 },
];

const SAMPLE_ORDERS = [
  { id: '#ORD-001', customer: 'Alice Johnson', date: '2024-03-01', total: 249.99, status: 'completed', items: 3 },
  { id: '#ORD-002', customer: 'Bob Smith', date: '2024-03-01', total: 89.99, status: 'processing', items: 1 },
  { id: '#ORD-003', customer: 'Carol White', date: '2024-02-29', total: 429.98, status: 'shipped', items: 2 },
  { id: '#ORD-004', customer: 'David Lee', date: '2024-02-28', total: 129.99, status: 'pending', items: 1 },
  { id: '#ORD-005', customer: 'Eva Martinez', date: '2024-02-28', total: 74.97, status: 'completed', items: 3 },
];

const STATS = [
  { label: 'Total Revenue', value: '$48,295', icon: FiDollarSign, change: '+12.5%', positive: true, bg: 'bg-blue-100', color: 'text-blue-600' },
  { label: 'Total Orders', value: '1,284', icon: FiShoppingBag, change: '+8.2%', positive: true, bg: 'bg-purple-100', color: 'text-purple-600' },
  { label: 'Customers', value: '9,643', icon: FiUsers, change: '+5.1%', positive: true, bg: 'bg-green-100', color: 'text-green-600' },
  { label: 'Avg. Order', value: '$37.60', icon: FiTrendingUp, change: '-2.4%', positive: false, bg: 'bg-orange-100', color: 'text-orange-600' },
];

const Dashboard = () => {
  const [period, setPeriod] = useState('weekly');
  const chartData = period === 'monthly' ? MONTHLY_DATA : WEEKLY_DATA;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className={`text-sm font-semibold ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Chart */}
        <SalesChart data={chartData} period={period} onPeriodChange={setPeriod} />

        {/* Orders Table */}
        <OrdersTable orders={SAMPLE_ORDERS} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
