import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./ProductListing.css";

const ProductListing = ({ product }) => {
  const { addItem } = useCart();

  // Function to handle adding product to cart
  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <section className="product-listing__item">
      <Link to={`/products/${product.id}`} className="product-listing__link">
        <img src={product.image} alt={product.name} className="product-listing__image" />
      </Link>
      <section className="product-listing__details">
        <h3 className="product-listing__name">{product.name}</h3>
        <p className="product-listing__price">${product.price.toFixed(2)}</p>
        <button onClick={handleAddToCart} className="product-listing__add-to-cart">
          Add to Cart
        </button>
      </section>
    </section>
  );
};

export default ProductListing;
