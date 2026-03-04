import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const { user } = useContext(AuthContext);
  const productInCart = cartItems.find((item) => item.id === product.id);
  const navigate = useNavigate();

  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";

    const handleAddToCart = () => {
        if (!user) {
            alert("Please login to add items to your cart!");
            navigate("/login"); // Redirect them to login
            return;
        }
        addToCart(product.id);
    };
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-card-image"
      />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">${product.price}</p>
        <div className="product-card-actions">
          <Link className="btn btn-secondary" to={`/products/${product.id}`}>
            View Details
          </Link>
          <button 
             className={`btn ${user ? 'btn-primary' : 'btn-disabled'}`} 
                onClick={handleAddToCart}
                >
             {user ? `Add to Cart ${productQuantityLabel}` : 'Login to Buy'}
            </button>
        </div>
      </div>
    </div>
  );
}