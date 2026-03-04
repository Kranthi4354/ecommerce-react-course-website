import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';


export default function Navbar() {
    const {user} = useContext(AuthContext);
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
                {user?(
                    <div className="navbar-auth-links">
                    <Link to="/auth" className="btn btn-secondary">Login</Link>
                    <Link to="/auth" className="btn btn-primary">Signup</Link>
                    <Link to="/auth" className="btn btn-primary">Logout</Link>
                </div>
                ):
                (<div className='navbar-user'>
                    <span>Hello, {user.email}</span>
                </div>
                )}
            </div>
        </div>
    </nav>
  );
}