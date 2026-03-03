import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import LoginModal from './LoginModal';

const AuthGuard = ({ children, onClick }) => {
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const [showLogin, setShowLogin] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const handleClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      e.stopPropagation();
      setShowLogin(true);
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <>
      <div
        className="relative inline-block"
        onMouseEnter={() => !isAuthenticated && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {showTooltip && !isAuthenticated && (
          <div
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap z-10 ${
              isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-800 text-white'
            }`}
          >
            Login to purchase
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
                isDark ? 'bg-gray-700' : 'bg-gray-800'
              }`}
            />
          </div>
        )}
        <div onClick={handleClick}>{children}</div>
      </div>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
};

export default AuthGuard;
