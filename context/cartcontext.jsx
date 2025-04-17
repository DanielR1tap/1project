"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);


  const addToCart = (product, quantity) => {

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        toast.success(`${product.title} quantity updated in cart!`, {
          style: {
            border: '1px solid #34D399',
            padding: '16px',
            color: '#34D399',
            backgroundColor: '#F0FDF4',
          },
          iconTheme: {
            primary: '#34D399',
            secondary: '#F0FDF4',
          },
        });
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      toast.success(`${product.title} added to cart!`, {
        style: {
          border: '1px solid #34D399',
          padding: '16px',
          color: '#34D399',
          backgroundColor: '#F0FDF4',
        },
        iconTheme: {
          primary: '#34D399',
          secondary: '#F0FDF4',
        },
      });
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.product.id === productId);
      if (item) {
        toast.success(`${item.product.title} removed from cart!`, {
          style: {
            border: '1px solid #34D399',
            padding: '16px',
            color: '#34D399',
            backgroundColor: '#F0FDF4',
          },
          iconTheme: {
            primary: '#34D399',
            secondary: '#F0FDF4',
          },
        });
      }
      return prevCart.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.product.id === productId);
      if (item) {
        toast.success(`${item.product.title} quantity updated to ${newQuantity}!`, {
          style: {
            border: '1px solid #34D399',
            padding: '16px',
            color: '#34D399',
            backgroundColor: '#F0FDF4',
          },
          iconTheme: {
            primary: '#34D399',
            secondary: '#F0FDF4',
          },
        });
      }
      return prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared after successful purchase!', {
      style: {
        border: '1px solid #34D399',
        padding: '16px',
        color: '#34D399',
        backgroundColor: '#F0FDF4',
      },
      iconTheme: {
        primary: '#34D399',
        secondary: '#F0FDF4',
      },
    });
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
  throw new Error("useCart must be used within a CartProvider");
  }
  return context;
 }
