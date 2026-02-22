import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Profile from './pages/Profile';
import SharePortfolio from './pages/SharePortfolio';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="app" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="build" element={<ProtectedRoute><Builder /></ProtectedRoute>} />
          <Route path="app/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Route>
        <Route path="p/:shareId" element={<SharePortfolio />} />
      </Routes>
    </AuthProvider>
  );
}
