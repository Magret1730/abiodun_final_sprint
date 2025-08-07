// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items from backend on mount
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/cart");
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add or increment product quantity in cart
  const addItem = async (product) => {
    if (product.quantity <= 0) {
      toast.error(`${product.name} is out of stock`);
      return;
    }

    try {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        const updated = { ...existing, quantity: existing.quantity + 1 };
        const res = await fetch(`http://localhost:3001/cart/${existing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
        if (!res.ok) throw new Error("Failed to update item quantity");
        setItems(items.map((item) => (item.id === existing.id ? updated : item)));
        toast.success(`Increased quantity of ${product.name} in cart`);
      } else {
        const newItem = { ...product, quantity: 1 };
        const res = await fetch("http://localhost:3001/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
        if (!res.ok) throw new Error("Failed to add item");
        setItems([...items, newItem]);
        toast.success(`${product.name} added to cart`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add/update item");
    }
  };

  // Remove item from cart
  const removeItem = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/cart/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove item");
      setItems(items.filter((item) => item.id !== id));
      toast.info("Item removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      const deletePromises = items.map((item) =>
        fetch(`http://localhost:3001/cart/${item.id}`, { method: "DELETE" })
      );
      await Promise.all(deletePromises);
      setItems([]);
      toast.info("Cart cleared");
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider value={{ items, loading, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
