"use client"; // This is a client-side context

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the shape of an item in the cart
type CartItem = {
  variantId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

// Define the shape of the context, now including clearCart
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void; // Added this function
  itemCount: number;
};

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.variantId === item.variantId);
      if (existingItem) {
        // If item exists, update its quantity
        return prevItems.map(i =>
          i.variantId === item.variantId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      // Otherwise, add the new item to the cart
      return [...prevItems, item];
    });
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };
  
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Add clearCart to the provider's value
  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};