import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Builder from './pages/Builder';
import SharePortfolio from './pages/SharePortfolio';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="build" element={<ProtectedRoute><Builder /></ProtectedRoute>} />
          <Route path="p/:shareId" element={<SharePortfolio />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
