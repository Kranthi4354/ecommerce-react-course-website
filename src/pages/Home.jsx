import { get } from "react-hook-form";
import { getProducts } from "../data/products";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
    const products=getProducts();
  return (
    <div className='page'>
      <div className="home-hero">
        <h1 className="home-title">Welcome to ShopHub</h1>
        <p className="home-subtitle">
            Discover the best deals on electronics, fashion, and more. Shop now and enjoy exclusive discounts and fast shipping!
        </p>
      </div>
      <div className="container">
        <h2 className="page-title">Our Products</h2>
        <div className="product-grid">
            {products.map((product)=>(
                <ProductCard product={product} key={product.id}/>
            ))}
        </div>
      </div>
    </div>
  );
}