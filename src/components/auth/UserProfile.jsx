import React, { useState, useRef, useEffect } from 'react';
import { FiUser, FiSettings, FiLogOut, FiChevronDown } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
          isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
        }`}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              isDark
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-100 text-indigo-600'
            }`}
          >
            {getInitials(user.name)}
          </div>
        )}
        <span
          className={`hidden sm:block text-sm font-medium max-w-[120px] truncate ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          {user.name}
        </span>
        <FiChevronDown
          size={14}
          className={`hidden sm:block transition-transform ${isOpen ? 'rotate-180' : ''} ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 top-full mt-2 w-64 rounded-xl shadow-lg border overflow-hidden z-50 ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          {/* User info header */}
          <div
            className={`px-4 py-3 border-b ${
              isDark ? 'border-gray-700' : 'border-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    isDark
                      ? 'bg-indigo-600 text-white'
                      : 'bg-indigo-100 text-indigo-600'
                  }`}
                >
                  {getInitials(user.name)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {user.name}
                </p>
                <p
                  className={`text-xs truncate ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <button
              onClick={() => setIsOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                isDark
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FiUser size={16} />
              Profile
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                isDark
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FiSettings size={16} />
              Settings
            </button>
          </div>

          {/* Logout */}
          <div
            className={`border-t py-1 ${
              isDark ? 'border-gray-700' : 'border-gray-100'
            }`}
          >
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                isDark
                  ? 'text-red-400 hover:bg-gray-700'
                  : 'text-red-600 hover:bg-red-50'
              }`}
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
