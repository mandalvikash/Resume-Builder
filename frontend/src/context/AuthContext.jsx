import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const TOKEN_KEY = 'genc_dossier_token';
const USER_KEY = 'genc_dossier_user';

/** Decode JWT payload (no verify). Returns { exp } or null. */
function getTokenExpiry(jwtToken) {
  if (!jwtToken || typeof jwtToken !== 'string') return null;
  try {
    const parts = jwtToken.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    return payload.exp ? payload.exp * 1000 : null; // exp in seconds -> ms
  } catch {
    return null;
  }
}

function isTokenExpired(jwtToken) {
  const expMs = getTokenExpiry(jwtToken);
  if (expMs == null) return true; // no exp or invalid -> treat as expired
  return Date.now() >= expMs;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem(USER_KEY);
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  });
  const [token, setTokenState] = useState(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) return null;
    if (isTokenExpired(stored)) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return null;
    }
    return stored;
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }, [token]);

  // Keep session valid until JWT expires; clear only when token is actually expired
  useEffect(() => {
    if (!token) return;
    if (isTokenExpired(token)) {
      setTokenState(null);
    }
  }, [token]);

  const setToken = (newToken, userData) => {
    if (!newToken) {
      setTokenState(null);
      setUser(null);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return;
    }
    setTokenState(newToken);
    setUser(userData || null);
    localStorage.setItem(TOKEN_KEY, newToken);
    if (userData) localStorage.setItem(USER_KEY, JSON.stringify(userData));
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ user, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function getStoredToken() {
  return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
}
