import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Renders children only when user is NOT logged in.
 * If logged in, redirects to home (/app).
 */
export default function GuestOnlyRoute({ children }) {
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/app" replace />;
  }
  return children;
}
