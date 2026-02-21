import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, token, logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-display font-bold text-xl tracking-tight">
            GenC Dossier
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="hover:text-primary-300 transition">Home</Link>
            {token ? (
              <>
                <Link to="/build" className="hover:text-primary-300 transition">Build Dossier</Link>
                <span className="text-slate-400 text-sm">{user?.name}</span>
                <button type="button" onClick={logout} className="hover:text-primary-300 transition text-sm">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary-300 transition">Log in</Link>
                <Link to="/signup" className="hover:text-primary-300 transition">Sign up</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-slate-800 text-slate-300 py-6 text-center text-sm">
        GenC Dossier Generator — Create & share your portfolio
      </footer>
    </div>
  );
}
