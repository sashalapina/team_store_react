import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Функция для добавления товара в корзину
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);

      if (itemExists) {
        // Если товар уже в корзине, увеличиваем его количество
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        // Если товара нет в корзине, добавляем его
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Функция для очистки корзины
  const clearCart = () => {
    setCartItems([]);
  };

  return <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
