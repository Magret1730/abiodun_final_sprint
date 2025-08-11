// src/pages/CartPage/CartPage.jsx
import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import Spinner from "../../components/Spinner/Spinner";
import "./CartPage.css";
import { toast } from "react-toastify";

const CartPage = () => {
  const { items, loading, removeItem, clearCart } = useCart();

  // Calculates total price
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  if (loading) return <Spinner loading={loading} />;

  // If cart is empty, show empty message
  if (items.length === 0)
    return (
      <div className="cart__empty">
        <h1 className="cart__empty-title">Your Cart is Empty</h1>
        <Link to="/" className="cart__continue-link">
          Continue Shopping
        </Link>
      </div>
    );

    // Function to increment item quantity
    const incrementQuantity = async (item) => {
      const resProduct = await fetch(`http://localhost:3001/products/${item.id}`);
      const product = await resProduct.json();
  
      if (product.quantity <= 0) {
        toast.error(`${product.name} is out of stock`);
        return;
      }
  
      const updatedCartItem = { ...item, quantity: item.quantity + 1 };
  
      // Update cart
      await fetch(`http://localhost:3001/cart/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCartItem),
      });
  
      // Decrease stock
      await fetch(`http://localhost:3001/products/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: product.quantity - 1 }),
      });
  
      window.location.reload(); // refetches  update
    };
  
    // Function to decrement item quantity
    const decrementQuantity = async (item) => {
      if (item.quantity === 1) {
        await removeItem(item.id);
        return;
      }
  
      const resProduct = await fetch(`http://localhost:3001/products/${item.id}`);
      const product = await resProduct.json();
  
      const updatedCartItem = { ...item, quantity: item.quantity - 1 };
  
      // Update cart
      await fetch(`http://localhost:3001/cart/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCartItem),
      });
  
      // Increase stock
      await fetch(`http://localhost:3001/products/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: product.quantity + 1 }),
      });
  
      window.location.reload(); // refetches update
    };
  

  return (
    <div className="cart">
      <h1 className="cart__title">Your Cart</h1>
      <table className="cart__table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <Link to={`/products/${item.id}`} className="cart__item-link">
                  <img src={item.image} alt={item.name} className="cart__item-image" />
                </Link>
                <span className="cart__item-name">{item.name}</span>
              </td>
              <td>
                <div className="cart__qty-controls">
                  <button className="cart__addsub-button" onClick={() => decrementQuantity(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="cart__addsub-button" onClick={() => incrementQuantity(item)}>+</button>
                </div>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => removeItem(item.id)} className="cart__remove-button">
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart__checkout">
        <p>Total: ${totalPrice}</p>
        <div className="cart__actions">
          <button onClick={clearCart} className="cart__clear-button">
            Clear Cart
          </button>
          <Link to="/checkout" className="cart__checkout-button">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

