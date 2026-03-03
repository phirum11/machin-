import React, { useState } from 'react';
import { FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp } from 'react-icons/fi';
import DashboardLayout from '../layout/DashboardLayout';
import SalesChart from '../components/dashboard/SalesChart';
import OrdersTable from '../components/dashboard/OrdersTable';
import { formatCurrency } from '../utils/formatCurrency';

const stats = [
  { label: 'Total Revenue', value: 8250, icon: FiDollarSign, color: 'bg-blue-100 text-blue-600', change: '+12%' },
  { label: 'Orders', value: 342, icon: FiShoppingBag, color: 'bg-green-100 text-green-600', change: '+8%' },
  { label: 'Customers', value: 1205, icon: FiUsers, color: 'bg-purple-100 text-purple-600', change: '+5%' },
  { label: 'Conversion', value: '3.6%', icon: FiTrendingUp, color: 'bg-orange-100 text-orange-600', change: '+0.4%' },
];

const weeklyData = [
  { label: 'Mon', value: 4200 },
  { label: 'Tue', value: 5800 },
  { label: 'Wed', value: 7100 },
  { label: 'Thu', value: 6300 },
  { label: 'Fri', value: 9200 },
  { label: 'Sat', value: 8400 },
  { label: 'Sun', value: 5600 },
];

const sampleOrders = [
  { id: 'ORD-001', customer: 'Alice Johnson', email: 'alice@example.com', date: '2024-03-20', total: 249.99, status: 'delivered' },
  { id: 'ORD-002', customer: 'Bob Smith', email: 'bob@example.com', date: '2024-03-21', total: 129.99, status: 'processing' },
  { id: 'ORD-003', customer: 'Carol White', email: 'carol@example.com', date: '2024-03-22', total: 599.99, status: 'shipped' },
  { id: 'ORD-004', customer: 'David Lee', email: 'david@example.com', date: '2024-03-22', total: 79.99, status: 'pending' },
  { id: 'ORD-005', customer: 'Eva Brown', email: 'eva@example.com', date: '2024-03-23', total: 399.99, status: 'cancelled' },
];

const Dashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [chartPeriod, setChartPeriod] = useState('weekly');

  return (
    <DashboardLayout activePage={activePage} onNavigate={setActivePage} pageTitle="Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => {
          const StatIcon = stat.icon;
          return (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <StatIcon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">
              {typeof stat.value === 'number' && stat.label.includes('Revenue') ? formatCurrency(stat.value) : stat.value}
            </p>
          </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="mb-6">
        <SalesChart data={weeklyData} period={chartPeriod} onPeriodChange={setChartPeriod} />
      </div>

      {/* Orders Table */}
      <OrdersTable orders={sampleOrders} />
    </DashboardLayout>
  );
};

export default Dashboard;
