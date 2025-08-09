import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { items } = useCart();
  const navigate = useNavigate();

  // Calculates total amount
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Handle proceed to payment
  const handleProceedToPayment = () => {
    navigate("/payment");
  };

  // Handle cancel action
  const handleCancel = () => {
    navigate("/cart");
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="checkout-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="checkout-total">
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
          </div>

          <div className="checkout-actions">
            <button className="proceed-btn" onClick={handleProceedToPayment}>
              Proceed to Payment
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
