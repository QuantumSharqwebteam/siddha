// StoreContext.jsx
import React, { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();  // Named export for StoreContext

export const useStore = () => useContext(StoreContext); // Named export for useStore

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  const addToCart = (productId) => {
    setCart((prevCart) => [...prevCart, productId]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(id => id !== productId));
  };

  const addToWishlist = (productId) => {
    setWishlist((prevWishlist) => [...prevWishlist, productId]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter(id => id !== productId));
  };

  return (
    <StoreContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, addToWishlist, removeFromWishlist }}>
      {children}
    </StoreContext.Provider>
  );
};
