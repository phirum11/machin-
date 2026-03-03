import React, { useState } from 'react';
import {
  FiSearch,
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiPhone,
  FiMail,
  FiChevronRight,
  FiBox,
  FiAlertCircle,
  FiCopy,
  FiExternalLink
} from 'react-icons/fi';
import MainLayout from '../layout/MainLayout';
import useAuth from '../hooks/useAuth';

// ─── MOCK ORDER DATA ──────────────────────────────────────────────────
const mockOrders = [
  {
    id: 'ORD-2847',
    date: 'Feb 28, 2026',
    total: 249.99,
    status: 'shipped',
    items: [
      {
        name: 'Wireless Noise-Cancelling Headphones',
        qty: 1,
        price: 249.99,
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80'
      }
    ],
    tracking: 'TRK-948571623',
    carrier: 'FedEx',
    estimatedDelivery: 'Mar 4, 2026',
    timeline: [
      { status: 'Order Placed', date: 'Feb 28, 11:30 AM', completed: true },
      {
        status: 'Payment Confirmed',
        date: 'Feb 28, 11:32 AM',
        completed: true
      },
      { status: 'Processing', date: 'Feb 28, 2:00 PM', completed: true },
      { status: 'Shipped', date: 'Mar 1, 9:15 AM', completed: true },
      { status: 'Out for Delivery', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false }
    ]
  },
  {
    id: 'ORD-2839',
    date: 'Feb 25, 2026',
    total: 729.98,
    status: 'delivered',
    items: [
      {
        name: 'Mechanical Keyboard RGB',
        qty: 1,
        price: 129.99,
        image:
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=80'
      },
      {
        name: 'Ultra-Wide Monitor 34"',
        qty: 1,
        price: 599.99,
        image:
          'https://images.unsplash.com/photo-1527443224154-c4a573d3a6d5?w=80'
      }
    ],
    tracking: 'TRK-735298146',
    carrier: 'UPS',
    estimatedDelivery: 'Mar 1, 2026',
    timeline: [
      { status: 'Order Placed', date: 'Feb 25, 3:00 PM', completed: true },
      { status: 'Payment Confirmed', date: 'Feb 25, 3:02 PM', completed: true },
      { status: 'Processing', date: 'Feb 25, 5:30 PM', completed: true },
      { status: 'Shipped', date: 'Feb 26, 8:00 AM', completed: true },
      { status: 'Out for Delivery', date: 'Feb 28, 7:30 AM', completed: true },
      { status: 'Delivered', date: 'Feb 28, 2:15 PM', completed: true }
    ]
  },
  {
    id: 'ORD-2851',
    date: 'Mar 1, 2026',
    total: 79.99,
    status: 'processing',
    items: [
      {
        name: 'Wireless Mouse Pro',
        qty: 1,
        price: 79.99,
        image:
          'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=80'
      }
    ],
    tracking: null,
    carrier: null,
    estimatedDelivery: 'Mar 6, 2026',
    timeline: [
      { status: 'Order Placed', date: 'Mar 1, 10:00 AM', completed: true },
      { status: 'Payment Confirmed', date: 'Mar 1, 10:02 AM', completed: true },
      { status: 'Processing', date: 'Mar 1, 11:00 AM', completed: true },
      { status: 'Shipped', date: '', completed: false },
      { status: 'Out for Delivery', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false }
    ]
  }
];

const statusConfig = {
  processing: {
    label: 'Processing',
    color: 'text-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    border: 'border-amber-200 dark:border-amber-500/20',
    icon: FiClock,
    dot: 'bg-amber-500'
  },
  shipped: {
    label: 'Shipped',
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    border: 'border-blue-200 dark:border-blue-500/20',
    icon: FiTruck,
    dot: 'bg-blue-500'
  },
  delivered: {
    label: 'Delivered',
    color: 'text-green-600',
    bg: 'bg-green-50 dark:bg-green-500/10',
    border: 'border-green-200 dark:border-green-500/20',
    icon: FiCheckCircle,
    dot: 'bg-green-500'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-red-600',
    bg: 'bg-red-50 dark:bg-red-500/10',
    border: 'border-red-200 dark:border-red-500/20',
    icon: FiAlertCircle,
    dot: 'bg-red-500'
  }
};

const OrderTracking = () => {
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const filteredOrders = searchQuery.trim()
    ? mockOrders.filter(
        (o) =>
          o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.tracking?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockOrders;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Order Tracking
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track your orders and view delivery status
          </p>
        </div>

        {/* ── Search bar ─────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID or tracking number..."
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:border-[#4F46E5] focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* ── Not logged in state ────────────────────────────────── */}
        {!isAuthenticated ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-12 text-center">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPackage className="text-[#4F46E5]" size={28} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Sign in to view your orders
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Log in to your account to track your orders, view delivery status,
              and manage your purchases.
            </p>
          </div>
        ) : (
          <>
            {/* ── Orders list ────────────────────────────────────── */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch
                    className="text-gray-300 dark:text-gray-500"
                    size={28}
                  />
                </div>
                <h2 className="text-lg font-bold text-gray-600 dark:text-gray-300 mb-1">
                  No orders found
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Try a different order ID or tracking number
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const config =
                    statusConfig[order.status] || statusConfig.processing;
                  const StatusIcon = config.icon;
                  const isExpanded = selectedOrder === order.id;

                  return (
                    <div
                      key={order.id}
                      className={`bg-white dark:bg-gray-800 rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isExpanded
                          ? 'border-[#4F46E5]/30 dark:border-[#4F46E5]/40 shadow-lg shadow-indigo-500/5'
                          : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-md'
                      }`}
                    >
                      {/* Order header (clickable) */}
                      <button
                        onClick={() =>
                          setSelectedOrder(isExpanded ? null : order.id)
                        }
                        className="w-full text-left p-5 flex items-center gap-4"
                      >
                        {/* Status icon */}
                        <div
                          className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}
                        >
                          <StatusIcon size={22} className={config.color} />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {order.id}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${config.bg} ${config.color} ${config.border} border`}
                            >
                              {config.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                            <span>{order.date}</span>
                            <span>•</span>
                            <span>
                              {order.items.length} item
                              {order.items.length > 1 ? 's' : ''}
                            </span>
                            <span>•</span>
                            <span className="font-semibold text-gray-600 dark:text-gray-300">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Expand arrow */}
                        <FiChevronRight
                          size={18}
                          className={`text-gray-300 dark:text-gray-600 transition-transform duration-300 flex-shrink-0 ${
                            isExpanded ? 'rotate-90' : ''
                          }`}
                        />
                      </button>

                      {/* Expanded detail */}
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isExpanded
                            ? 'max-h-[800px] opacity-100'
                            : 'max-h-0 opacity-0'
                        } overflow-hidden`}
                      >
                        <div className="px-5 pb-5 border-t border-gray-50 dark:border-gray-700/50 pt-4 space-y-5">
                          {/* Items */}
                          <div>
                            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                              Items
                            </h4>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 dark:bg-gray-700/30"
                                >
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-lg object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      Qty: {item.qty}
                                    </p>
                                  </div>
                                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                    ${item.price.toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tracking info */}
                          {order.tracking && (
                            <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10">
                              <FiTruck className="text-[#4F46E5]" size={16} />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {order.carrier} • Tracking Number
                                </p>
                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 font-mono">
                                  {order.tracking}
                                </p>
                              </div>
                              <button
                                onClick={() => copyToClipboard(order.tracking)}
                                className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 text-gray-400 hover:text-[#4F46E5] transition-all"
                                title="Copy tracking number"
                              >
                                {copiedId === order.tracking ? (
                                  <FiCheckCircle
                                    size={16}
                                    className="text-green-500"
                                  />
                                ) : (
                                  <FiCopy size={16} />
                                )}
                              </button>
                            </div>
                          )}

                          {/* Estimated delivery */}
                          <div className="flex items-center gap-2 text-sm">
                            <FiMapPin size={14} className="text-gray-400" />
                            <span className="text-gray-500 dark:text-gray-400">
                              Estimated delivery:
                            </span>
                            <span className="font-bold text-gray-800 dark:text-gray-200">
                              {order.estimatedDelivery}
                            </span>
                          </div>

                          {/* Timeline */}
                          <div>
                            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                              Delivery Timeline
                            </h4>
                            <div className="space-y-0">
                              {order.timeline.map((step, idx) => {
                                const isLast =
                                  idx === order.timeline.length - 1;
                                return (
                                  <div key={idx} className="flex gap-3">
                                    {/* Dot and line */}
                                    <div className="flex flex-col items-center">
                                      <div
                                        className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                                          step.completed
                                            ? 'bg-[#4F46E5] border-[#4F46E5]'
                                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600'
                                        }`}
                                      />
                                      {!isLast && (
                                        <div
                                          className={`w-0.5 h-8 ${
                                            step.completed
                                              ? 'bg-[#4F46E5]'
                                              : 'bg-gray-200 dark:bg-gray-700'
                                          }`}
                                        />
                                      )}
                                    </div>
                                    {/* Label */}
                                    <div className={`pb-4 ${isLast ? '' : ''}`}>
                                      <p
                                        className={`text-sm font-semibold ${
                                          step.completed
                                            ? 'text-gray-800 dark:text-gray-200'
                                            : 'text-gray-400 dark:text-gray-500'
                                        }`}
                                      >
                                        {step.status}
                                      </p>
                                      {step.date && (
                                        <p className="text-[11px] text-gray-400 dark:text-gray-500">
                                          {step.date}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── Help section ───────────────────────────────────── */}
            <div className="mt-10 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-500/5 dark:to-blue-500/5 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-500/10">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">
                Need help with your order?
              </h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-[#4F46E5] hover:text-[#4338CA] font-semibold transition-colors"
                >
                  <FiPhone size={14} />
                   096 79 45 153
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-[#4F46E5] hover:text-[#4338CA] font-semibold transition-colors"
                >
                  <FiMail size={14} />
                  ponphirum@gmail.com
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default OrderTracking;
