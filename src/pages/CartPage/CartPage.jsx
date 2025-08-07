// src/pages/CartPage/CartPage.jsx
import React from "react";
import { useCart } from "../../context/Cart";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import Spinner from "../../components/Spinner/Spinner";
import "./CartPage.css";

const CartPage = () => {
  const { items, loading, removeItem, clearCart } = useCart();

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  if (loading) return <Spinner loading={loading} />;

  if (items.length === 0)
    return (
      <div className="cart__empty">
        <h1>Your Cart is Empty</h1>
        <Link to="/" className="cart__continue-link">
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="cart">
      <h1>Your Cart</h1>
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
                <span>{item.name}</span>
              </td>
              <td>{item.quantity}</td>
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
        <button onClick={clearCart} className="cart__clear-button">
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;

