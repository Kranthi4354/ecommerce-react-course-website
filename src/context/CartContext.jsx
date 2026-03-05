import { createContext, useState, useContext } from "react";
import { getProductById } from "../data/products";


const CartContext = createContext(null);


export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);


  function addToCart(productId) {
    // 1. Convert ID to Number to prevent "1" !== 1 mismatches
    const idToFind = Number(productId);

    const existing = cartItems.find((item) => item.id === idToFind);

    if (existing) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === idToFind
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { id: idToFind, quantity: 1 }]);
    }
  }

  function getCartItemsWithProducts() {
    return cartItems
      .map((item) => ({
        ...item,
        product: getProductById(item.id),
      }))
      .filter((item) => item.product);
  }

  function removeFromCart(productId) {
    setCartItems(cartItems.filter((item) => item.id !== Number(productId)));
  }

  function updateQuantity(productId, quantity) {
    const idToUpdate = Number(productId);
    if (quantity <= 0) {
      removeFromCart(idToUpdate);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === idToUpdate ? { ...item, quantity } : item
      )
    );
  }

  function getCartTotal() {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartItemsWithProducts,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}