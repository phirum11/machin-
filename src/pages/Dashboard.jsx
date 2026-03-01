import React, { useState } from 'react';
import { FiDollarSign, FiShoppingBag, FiPackage, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { formatCurrency } from '../utils/formatCurrency';
import SalesChart from '../components/dashboard/SalesChart';
import OrdersTable from '../components/dashboard/OrdersTable';

const statsData = [
  { label: 'Total Revenue', value: formatCurrency(84350), change: '+12.5%', positive: true, icon: FiDollarSign, color: 'blue' },
  { label: 'Total Orders', value: '1,248', change: '+8.2%', positive: true, icon: FiShoppingBag, color: 'green' },
  { label: 'Products', value: '342', change: '+3.1%', positive: true, icon: FiPackage, color: 'purple' },
  { label: 'Customers', value: '5,671', change: '+15.3%', positive: true, icon: FiUsers, color: 'orange' },
];

const chartData = [
  { label: 'Mon', value: 4200 },
  { label: 'Tue', value: 6800 },
  { label: 'Wed', value: 5100 },
  { label: 'Thu', value: 7300 },
  { label: 'Fri', value: 9200 },
  { label: 'Sat', value: 11400 },
  { label: 'Sun', value: 8700 },
];

const ordersData = [
  { id: '1042', customer: 'Alice Johnson', email: 'alice@example.com', date: '2024-03-15', total: 245.99, status: 'delivered' },
  { id: '1041', customer: 'Bob Smith', email: 'bob@example.com', date: '2024-03-14', total: 89.50, status: 'shipped' },
  { id: '1040', customer: 'Carol White', email: 'carol@example.com', date: '2024-03-14', total: 312.00, status: 'processing' },
  { id: '1039', customer: 'David Brown', email: 'david@example.com', date: '2024-03-13', total: 55.25, status: 'pending' },
  { id: '1038', customer: 'Eva Martinez', email: 'eva@example.com', date: '2024-03-12', total: 178.75, status: 'delivered' },
  { id: '1037', customer: 'Frank Lee', email: 'frank@example.com', date: '2024-03-12', total: 63.00, status: 'cancelled' },
];

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
  orange: 'bg-orange-50 text-orange-600',
};

const Dashboard = () => {
  const [period, setPeriod] = useState('weekly');

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`flex items-center gap-1 text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                  <FiTrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <SalesChart data={chartData} period={period} onPeriodChange={setPeriod} />

      {/* Orders Table */}
      <OrdersTable orders={ordersData} />
    </div>
  );
};

export default Dashboard;
