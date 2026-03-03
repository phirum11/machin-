import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiX,
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiCheckCircle
} from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import GoogleLoginButton from './GoogleLoginButton';

const LoginModal = ({ isOpen, onClose }) => {
  const { login, register, loginWithGoogle, loading } = useAuth();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('login');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(loginForm.email, loginForm.password);
      setSuccess('Welcome back!');
      setTimeout(() => onClose(), 600);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(registerForm.name, registerForm.email, registerForm.password);
      setSuccess('Account created!');
      setTimeout(() => onClose(), 600);
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    try {
      await loginWithGoogle(credentialResponse);
      setSuccess('Signed in with Google!');
      setTimeout(() => onClose(), 600);
    } catch (err) {
      setError(err.message || 'Google login failed');
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError('');
    setSuccess('');
  };

  const inputClass = isDark
    ? 'bg-gray-800/60 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500/20'
    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500/20';

  const iconClass = isDark
    ? 'text-gray-500 group-focus-within:text-indigo-400'
    : 'text-gray-400 group-focus-within:text-indigo-500';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className={`relative w-full max-w-md rounded-2xl shadow-2xl ${
                isDark ? 'bg-gray-900' : 'bg-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-t-2xl px-6 py-5">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <FiX size={16} />
                </button>
                <h2 className="text-xl font-bold text-white">
                  {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-indigo-200 text-sm mt-0.5">
                  {activeTab === 'login'
                    ? 'Sign in to continue shopping'
                    : 'Join us and start shopping'}
                </p>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                {/* Tabs */}
                <div className={`flex rounded-xl p-1 mb-5 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  {['login', 'register'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => switchTab(tab)}
                      className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                        activeTab === tab
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : isDark
                            ? 'text-gray-400 hover:text-gray-200'
                            : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab === 'login' ? 'Sign In' : 'Sign Up'}
                    </button>
                  ))}
                </div>

                {/* Messages */}
                <AnimatePresence mode="wait">
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mb-4 p-3 rounded-lg text-sm flex items-center gap-2 ${
                        isDark
                          ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                          : 'bg-green-50 border border-green-200 text-green-700'
                      }`}
                    >
                      <FiCheckCircle size={16} />
                      {success}
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mb-4 p-3 rounded-lg text-sm ${
                        isDark
                          ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                          : 'bg-red-50 border border-red-200 text-red-600'
                      }`}
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Google */}
                <div className="flex justify-center mb-4">
                  <GoogleLoginButton
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError('Google Sign-In failed')}
                    disabled={loading}
                  />
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex-1 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>or</span>
                  <div className={`flex-1 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                </div>

                {/* Login Form */}
                {activeTab === 'login' && (
                  <motion.form
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleLogin}
                    className="space-y-3"
                  >
                    <div className="relative group">
                      <FiMail className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`} size={16} />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${inputClass}`}
                        required
                      />
                    </div>

                    <div className="relative group">
                      <FiLock className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`} size={16} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${inputClass}`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                  </motion.form>
                )}

                {/* Register Form */}
                {activeTab === 'register' && (
                  <motion.form
                    key="register"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleRegister}
                    className="space-y-3"
                  >
                    <div className="relative group">
                      <FiUser className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`} size={16} />
                      <input
                        type="text"
                        placeholder="Full name"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${inputClass}`}
                        required
                      />
                    </div>

                    <div className="relative group">
                      <FiMail className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`} size={16} />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${inputClass}`}
                        required
                      />
                    </div>

                    <div className="relative group">
                      <FiLock className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`} size={16} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password (min 6 characters)"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${inputClass}`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                  </motion.form>
                )}

                {/* Footer */}
                <p className={`text-center text-xs mt-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  By continuing, you agree to our{' '}
                  <span className="text-indigo-500 hover:underline cursor-pointer">Terms</span>
                  {' & '}
                  <span className="text-indigo-500 hover:underline cursor-pointer">Privacy</span>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
