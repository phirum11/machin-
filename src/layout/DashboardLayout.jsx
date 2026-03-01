import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';

const DashboardLayout = ({ children, activePage, onNavigate, title }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const notifications = [
    { message: 'New order #1042 received', time: '2 min ago', read: false },
    { message: 'Payment confirmed for order #1038', time: '1 hour ago', read: false },
    { message: 'Product "Headphones" is low on stock', time: '3 hours ago', read: true }
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
        <Sidebar
          activePage={activePage}
          onNavigate={(page) => {
            onNavigate(page);
            setIsMobileMenuOpen(false);
          }}
          onLogout={() => {}}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          title={title}
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
          notifications={notifications}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
