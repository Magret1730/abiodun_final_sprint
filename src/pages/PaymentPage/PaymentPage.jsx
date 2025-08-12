import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const navigate = useNavigate();

  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const { items, clearCartWithoutRestocking } = useCart();

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();

    const { name, cardNumber, expiry, cvv } = cardDetails;

    // Validate payment details
    if (!name || !cardNumber || !expiry || !cvv) {
      toast.error("Please fill in all payment details");
      return;
    }

    // Payment processing logic
    try {
      const response = await fetch("http://localhost:3001/paymentDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          cardNumber,
          expiry,
          cvv,
          amount: totalAmount()
        })
      });
      if (!response.ok) {
        throw new Error("Payment processing failed");
      }
      const data = await response.json();
      console.log("data", data);

      // If info is saved to db then payment is successful
      toast.success("Payment processed. Order placed successfully!");
      clearCartWithoutRestocking();
      navigate("/");
    } catch (error) {
      console.error("Payment processing failed:", error);
      toast.error("Payment processing failed. Please try again.");
      return;
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate("/cart");
  };

  // Calculate total amount
  const totalAmount = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="payment-page">
      <h2>Checkout</h2>

      <section className="order-summary">
        <h3>Order Summary</h3>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} x {item.quantity} — ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <p><strong>Total:</strong> ${totalAmount().toFixed(2)}</p>
      </section>

      <form onSubmit={handlePayment} className="payment-form">
        <h3>Payment Details</h3>
        <input type="text" name="Name on Card" id="Name on Card"  placeholder="Name on Card" value={cardDetails.name} onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} required />
        <input type="text" placeholder="Card Number" value={cardDetails.cardNumber} onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })} required />
        <input type="text" placeholder="MM/YY" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} required />
        <input type="text" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} required />

        <div className="payment-buttons">
          <button type="submit" className="pay-btn">Proceed to Payment</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
