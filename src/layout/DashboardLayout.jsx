import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';

const DashboardLayout = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const notifications = [
    { message: 'New order #1042 received', time: '2 minutes ago', read: false },
    { message: 'Low stock alert: Yoga Mat', time: '1 hour ago', read: false },
    { message: 'Monthly report is ready', time: '3 hours ago', read: true },
  ];

  const pageTitles = {
    dashboard: 'Dashboard',
    analytics: 'Analytics',
    orders: 'Orders',
    products: 'Products',
    customers: 'Customers',
    invoices: 'Invoices',
    payments: 'Payments',
    settings: 'Settings',
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        onLogout={() => {}}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          title={pageTitles[activePage] || 'Dashboard'}
          notifications={notifications}
          user={{ name: 'Admin User' }}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
