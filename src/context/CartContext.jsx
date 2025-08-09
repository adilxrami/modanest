// src/context/CartContext.js
import { createContext, useContext } from "react";

// ✅ Create context
export const CartContext = createContext();

// ✅ Custom hook
export function useCart() {
  return useContext(CartContext);
}
