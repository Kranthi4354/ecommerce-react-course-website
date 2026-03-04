  import { Routes, Route } from "react-router-dom";
  import Home from "./pages/Home";
  import Auth from "./pages/Auth";
  import Checkout from "./pages/Checkout";
  import Navbar from "./components/Navbar";
  import { useContext } from "react";
  import { AuthContext } from "./context/AuthContext";
  import "./App.css";
  import AuthProvider from "./context/AuthContext";
  import ProductDetails from "./pages/ProductDetails";
  import CartProvider from "./context/CartContext";
  import { Navigate } from "react-router-dom";

  function App() {
    const { user } = useContext(AuthContext);
    return (
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
  
              {/* Pass mode as a prop to each route */}
              <Route path="/login" element={<Auth mode="login" />} />
              <Route path="/signup" element={<Auth mode="signup" />} />
              
              <Route 
                path="/checkout" 
                element={user ? <Checkout /> : <Navigate to="/login" />} 
              />
              <Route path="/products/:id" element={<ProductDetails />} />
            </Routes>
          </div>
    );
  }

  export default App;