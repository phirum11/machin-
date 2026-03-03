import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext(null);

const STORAGE_KEY = 'auth_user';

/* Decode the payload of a JWT (Google credential) without a library */
function decodeJwtPayload(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const persistUser = useCallback((userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = useCallback(
    async (email, password) => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        const mockUser = {
          id: `user_${Date.now()}`,
          name: email
            .split('@')[0]
            .replace(/[._]/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          email,
          avatar: null,
          role: 'user'
        };

        persistUser(mockUser);
        return mockUser;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [persistUser]
  );

  /** Handle a real Google credential response (JWT id_token) */
  const loginWithGoogle = useCallback(
    async (credentialResponse) => {
      setLoading(true);
      try {
        if (!credentialResponse?.credential) {
          throw new Error('No credential received from Google');
        }

        const payload = decodeJwtPayload(credentialResponse.credential);
        if (!payload) {
          throw new Error('Failed to decode Google credential');
        }

        const googleUser = {
          id: `google_${payload.sub}`,
          name: payload.name || payload.given_name || 'Google User',
          email: payload.email,
          avatar: payload.picture || null,
          role: 'user'
        };

        persistUser(googleUser);
        return googleUser;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [persistUser]
  );

  const register = useCallback(
    async (name, email, password) => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (!name || !email || !password) {
          throw new Error('All fields are required');
        }

        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        const mockUser = {
          id: `user_${Date.now()}`,
          name,
          email,
          avatar: null,
          role: 'user'
        };

        persistUser(mockUser);
        return mockUser;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [persistUser]
  );

  const logout = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    loginWithGoogle,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
