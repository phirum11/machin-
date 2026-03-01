import React, { useState } from 'react';
import {
  FiShoppingBag, FiDollarSign, FiUsers, FiTrendingUp,
  FiPackage, FiArrowUp, FiArrowDown
} from 'react-icons/fi';
import DashboardLayout from '../layout/DashboardLayout';
import SalesChart from '../components/dashboard/SalesChart';
import OrdersTable from '../components/dashboard/OrdersTable';
import { formatCurrency } from '../utils/formatCurrency';

const WEEKLY_DATA = [
  { label: 'Mon', value: 4200 },
  { label: 'Tue', value: 5800 },
  { label: 'Wed', value: 3900 },
  { label: 'Thu', value: 7200 },
  { label: 'Fri', value: 8500 },
  { label: 'Sat', value: 9100 },
  { label: 'Sun', value: 6300 }
];

const MONTHLY_DATA = [
  { label: 'Jan', value: 42000 }, { label: 'Feb', value: 58000 },
  { label: 'Mar', value: 39000 }, { label: 'Apr', value: 72000 },
  { label: 'May', value: 85000 }, { label: 'Jun', value: 91000 },
  { label: 'Jul', value: 63000 }, { label: 'Aug', value: 78000 },
  { label: 'Sep', value: 82000 }, { label: 'Oct', value: 95000 },
  { label: 'Nov', value: 105000 }, { label: 'Dec', value: 120000 }
];

const SAMPLE_ORDERS = [
  { id: '1042', customer: 'Alice Johnson', email: 'alice@example.com', date: '2024-03-10', total: 349.99, status: 'delivered' },
  { id: '1041', customer: 'Bob Smith', email: 'bob@example.com', date: '2024-03-09', total: 129.99, status: 'shipped' },
  { id: '1040', customer: 'Carol White', email: 'carol@example.com', date: '2024-03-09', total: 89.99, status: 'processing' },
  { id: '1039', customer: 'David Brown', email: 'david@example.com', date: '2024-03-08', total: 599.98, status: 'delivered' },
  { id: '1038', customer: 'Eve Davis', email: 'eve@example.com', date: '2024-03-07', total: 179.97, status: 'pending' },
  { id: '1037', customer: 'Frank Miller', email: 'frank@example.com', date: '2024-03-06', total: 249.95, status: 'cancelled' },
  { id: '1036', customer: 'Grace Lee', email: 'grace@example.com', date: '2024-03-05', total: 74.99, status: 'delivered' }
];

const StatCard = ({ icon, title, value, change, positive, color }) => {
  const Icon = icon;
  return (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${positive ? 'text-green-600' : 'text-red-500'}`}>
        {positive ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />}
        {change}
      </div>
    </div>
    <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
    <p className="text-sm text-gray-500">{title}</p>
  </div>
  );
};

const Dashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [chartPeriod, setChartPeriod] = useState('weekly');

  const chartData = chartPeriod === 'monthly' ? MONTHLY_DATA : WEEKLY_DATA;

  const pageTitle = activePage.charAt(0).toUpperCase() + activePage.slice(1);

  return (
    <DashboardLayout activePage={activePage} onNavigate={setActivePage} title={pageTitle}>
      {activePage === 'dashboard' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard icon={FiDollarSign} title="Total Revenue" value={formatCurrency(84320)} change="12.5%" positive={true} color="bg-blue-500" />
            <StatCard icon={FiShoppingBag} title="Total Orders" value="1,042" change="8.2%" positive={true} color="bg-emerald-500" />
            <StatCard icon={FiUsers} title="Customers" value="3,891" change="4.1%" positive={true} color="bg-violet-500" />
            <StatCard icon={FiPackage} title="Products" value="248" change="2.3%" positive={false} color="bg-amber-500" />
          </div>

          {/* Sales Chart */}
          <SalesChart data={chartData} period={chartPeriod} onPeriodChange={setChartPeriod} />

          {/* Orders Table */}
          <OrdersTable orders={SAMPLE_ORDERS} />
        </div>
      )}

      {activePage === 'orders' && (
        <OrdersTable orders={SAMPLE_ORDERS} />
      )}

      {activePage !== 'dashboard' && activePage !== 'orders' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FiTrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">{pageTitle}</h3>
          <p className="text-gray-500">This section is coming soon.</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
