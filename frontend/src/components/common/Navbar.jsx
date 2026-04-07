import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-beige/70 bg-ivory/90 backdrop-blur sticky top-0 z-50">
      <nav className="container-shell flex items-center justify-between py-4">
        <Link to="/" className="font-serif text-2xl tracking-wide">Maison Éditorial</Link>
        <div className="flex items-center gap-4 text-sm md:text-base">
          <Link className="premium-link" to="/">Home</Link>
          <Link className="premium-link" to="/category/all">Categories</Link>
          {user ? (
            <>
              <Link className="premium-link" to="/admin">Dashboard</Link>
              <button className="premium-link" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link className="premium-link" to="/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
