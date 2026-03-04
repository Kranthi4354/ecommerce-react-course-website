import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export function useProtectedAddToCart() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (productId) => {
    if (!user) {
      alert("Please login to add items to your cart!");
      navigate("/login");
      return;
    }
    addToCart(productId);
  };

  return handleAddToCart;
}