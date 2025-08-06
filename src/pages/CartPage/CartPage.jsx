import React from 'react';
import './CartPage.css';
import { useContext, useEffect, useState } from 'react';
// import { CartContext } from '../../context/Cart';
// import { CounterContext } from '../../context/Counter';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  // const cart = useContext(CartContext);
  // const counter = useContext(CounterContext);
  // console.log("Cart items", cart.items);
  // console.log("Counter", counter.counter);
  // const handleRemoveItem = (id) => {
  //   const updatedItems = cart.items.filter(item => item.id !== id);
  //   cart.setItems(updatedItems);
  //   counter.setCounter(counter.counter - 1);
  //   toast.error('Item removed from cart');
  // }
  // const handleClearCart = () => {
  //   cart.setItems([]);
  //   counter.setCounter(0);
  //   toast.info('Cart cleared');
  // }
  // Calculate total price
  // const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  // if (cart.items.length === 0) {
  //   return (
  //     <div className="cart__empty">
  //       <h1 className="cart__empty-title">Your Cart is Empty</h1>
  //       <Link to="/" className="cart__continue-link">Continue Shopping</Link>
  //     </div>
  //   );
  // }

  // Fetch the cart items from the server
  const fetchCartItems = async () => {
    try {
    const res = await fetch(`http://localhost:3001/cart`);

    const data = await res.json();

    return data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return [];
    }
  };

  // useEffect to fetch cart items on component mount
  useEffect(() => {
    const getCartItems = async () => {
      const items = await fetchCartItems();
      setCartItems(items);
    };
  
    getCartItems();
  }, []);

  // Render the cart component
  return (
    <div className="cart">
      <h1 className="cart__title">Your Cart</h1>
      <section className="cart__items">
        <table className="cart__table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? 
              cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.image} alt={item.name} className="cart__item-image" />
                    <span className="cart__item-name">{item.name}</span>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleRemoveItem(item.id)} className="cart__remove-button">
                      <AiOutlineDelete className='cart__remove-icon' />
                    </button>
                  </td>
                </tr>
              ))
            : (
              <tr>
                <td colSpan="5" className="cart__empty-message">Your cart is empty</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <section className="cart__checkout">
        <div className="cart__checkout-details">
          {/* <p className="cart__total">Total: ${totalPrice}</p> */}
          {/* <button onClick={handleClearCart} className="cart__clear-button">Clear Cart</button> */}
          <button className="cart__checkout-button">Checkout</button>
        </div>
        <div className="cart__continue-shopping">
          <Link to="/" className="cart__continue-link">Continue Shopping</Link>
        </div>
      </section>
    </div>
  );
}

export default CartPage;