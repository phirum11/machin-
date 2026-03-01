import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';

const DashboardLayout = ({ children, activePage = 'dashboard', onNavigate, pageTitle = 'Dashboard' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const notifications = [
    { message: 'New order received #ORD-0042', time: '5 minutes ago', read: false },
    { message: 'Payment confirmed for #ORD-0041', time: '1 hour ago', read: false },
    { message: 'Low stock alert: Bluetooth Speaker', time: '3 hours ago', read: true },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar activePage={activePage} onNavigate={onNavigate || (() => {})} onLogout={() => {}} />
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full z-50 lg:hidden">
            <Sidebar activePage={activePage} onNavigate={(page) => { onNavigate?.(page); setIsMobileMenuOpen(false); }} onLogout={() => {}} />
          </div>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          title={pageTitle}
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
