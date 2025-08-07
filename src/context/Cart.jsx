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
      const newProductQuantity = product.quantity - 1;

      // Update product stock in DB
      await fetch(`http://localhost:3001/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newProductQuantity }),
      });

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
      const itemToRemove = items.find((item) => item.id === id);
      if (!itemToRemove) return;
  
      // Increase product quantity back in stock
      const resProduct = await fetch(`http://localhost:3001/products/${id}`);
      const product = await resProduct.json();
      const newProductQuantity = product.quantity + itemToRemove.quantity;
  
      await fetch(`http://localhost:3001/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newProductQuantity }),
      });
  
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

  // Clears entire cart and restock
  const clearCart = async () => {
    try {
      // Update stock quantity back for each product in cart
      const updateStockPromises = items.map(async (item) => {
        const resProduct = await fetch(`http://localhost:3001/products/${item.id}`);
        if (!resProduct.ok) throw new Error(`Failed to fetch product ${item.id}`);
        const product = await resProduct.json();
  
        const updatedQuantity = product.quantity + item.quantity;
  
        return fetch(`http://localhost:3001/products/${item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: updatedQuantity }),
        });
      });
  
      // Waits for all stock updates
      await Promise.all(updateStockPromises);
  
      // Deletes all cart items
      const deletePromises = items.map((item) =>
        fetch(`http://localhost:3001/cart/${item.id}`, { method: "DELETE" })
      );
      await Promise.all(deletePromises);
  
      setItems([]);
      // toast.info("Cart cleared and product stock restored");
      toast.info("Cart cleared");
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear cart and restore stock");
    }
  };

  // Clears cart with restocking
  const clearCartWithoutRestocking = async () => {
    try {
      // Deletes all cart items without updating stock
      const deletePromises = items.map((item) =>
        fetch(`http://localhost:3001/cart/${item.id}`, { method: "DELETE" })
      );
      await Promise.all(deletePromises);

      setItems([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider value={{ items, loading, addItem, removeItem, clearCart, clearCartWithoutRestocking }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
