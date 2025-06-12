import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("cartItems");
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  // Save to localStorage every time cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add dish with quantity
  const addToCart = (dish, quantity) => {
    if (quantity <= 0) return;
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

  // Update quantity (set to zero to remove)
  const updateQuantity = (dishName, newQuantity) => {
    if (newQuantity < 0) return;
    setCartItems((prev) =>
      newQuantity === 0
        ? prev.filter((item) => item.name !== dishName)
        : prev.map((item) =>
            item.name === dishName ? { ...item, quantity: newQuantity } : item
          )
    );
  };

  // Remove item completely
  const removeItem = (dishName) =>
    setCartItems((prev) => prev.filter((item) => item.name !== dishName));

  // Clear all items from cart
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
