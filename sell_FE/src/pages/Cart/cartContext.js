import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  const addToCart = () => {
    setIsCartEmpty(false);
  };

  return (
    <CartContext.Provider value={{ isCartEmpty, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
