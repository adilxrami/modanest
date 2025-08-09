// src/context/CartProvider.jsx
import { useState } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Add to cart with selectedColor and quantity
  const addToCart = (product) => {
    const { id, selectedColor = "default", quantity = 1 } = product;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === id && item.selectedColor === selectedColor
      );

      if (existingIndex !== -1) {
        const updatedItems = [...prev];
        updatedItems[existingIndex].quantity += quantity;
        return updatedItems;
      }

      return [...prev, { ...product, selectedColor, quantity }];
    });
  };

  // ✅ Remove item by ID and color
  const removeFromCart = (id, selectedColor = "default") => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.selectedColor === selectedColor)
      )
    );
  };

  // ✅ Update quantity for a specific color variant
  const updateQuantity = (id, selectedColor, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedColor === selectedColor
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
