import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    const confirmed = window.confirm("Do you really want to logout?");
    
    if (confirmed) {
      logout();
    }
    // If 'No' (Cancel) is clicked, the function simply finishes 
    // and the user stays exactly where they are.
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          ShopHub
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/checkout" className="navbar-link">
            Cart
          </Link>
        </div>

        <div className="navbar-auth">
          {!user ? (
            // Logic for Logged Out users
            <div className="nav-links">
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/signup" className="btn btn-small">Sign Up</Link>
            </div>
          ) : (
            // Logic for Logged In users
            <div className="navbar-user">
              <span className="navbar-greeting">Hello, {user.email}</span>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}