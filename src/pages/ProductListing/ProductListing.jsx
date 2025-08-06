import React, { useEffect } from 'react';
import "./ProductListing.css";
import { Link } from 'react-router-dom';
import { CounterContext } from '../../context/Counter';
import { useContext } from 'react';
import { CartContext } from '../../context/Cart';
import { toast } from 'react-toastify';

const ProductListing = ({product}) => {
  const cart = useContext(CartContext);
  const counter = useContext(CounterContext);

  const { id, name, price, image, description, quantity } = product;


  const handleAddToCart = async () => {
    const item = { id, name, price, image, description, quantity };
  
    // Update context
    cart.setItems([...cart.items, item]);
    counter.setCounter(counter.counter + 1);
  
    // Optional: Save to backend
    try {
      const res = await fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(item),
      });
  
      if (!res.ok) {
        throw new Error("Failed to save to backend");
      }
  
      toast.success(`${name} added to cart successfully`);
    } catch (error) {
      console.error("Failed to add to backend", error);
      toast.error("Error adding item to cart");
    }
  };
  

  return (
    <section className="product-listing__item">
        <Link to={`/products/${product.id}`} className="product-listing__link">
          <img src={product.image} alt={product.name} className="product-listing__image" />
        </Link>
        <section className='product-listing__details'>
          <h3 className="product-listing__name">{product.name}</h3>
          <p className="product-listing__price">{product.price}</p>
          <button onClick={handleAddToCart} className="product-listing__add-to-cart">Add to Cart</button>
        </section>
    </section>
  )
}

export default ProductListing;