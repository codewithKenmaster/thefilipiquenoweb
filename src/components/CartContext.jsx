import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cartItems");
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  // Save cart to localStorage on cartItems change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add dish with quantity to cart
  const addToCart = (dish, quantity) => {
    if (quantity <= 0) return; // Ignore non-positive quantities
    setCartItems((prev) => {
      const exists = prev.find((item) => item.name === dish.name);
      if (exists) {
        return prev.map((item) =>
          item.name === dish.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...dish, quantity }];
      }
    });
  };

  // Update quantity of an existing dish in cart
  const updateQuantity = (dishName, newQuantity) => {
    if (newQuantity < 0) return; // Ignore negative quantities
    setCartItems((prev) => {
      // If quantity is zero, remove item from cart
      if (newQuantity === 0) {
        return prev.filter((item) => item.name !== dishName);
      }
      return prev.map((item) =>
        item.name === dishName ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  // Remove a dish completely from cart
  const removeItem = (dishName) =>
    setCartItems((prev) => prev.filter((item) => item.name !== dishName));

  // Clear entire cart
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to consume cart context
export const useCart = () => useContext(CartContext);
