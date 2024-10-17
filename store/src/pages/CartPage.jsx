import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Функция для добавления товара в корзину
  const addToCart = (product) => {
    console.log('Добавление товара в корзину:', product); // Лог для проверки
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);

      if (itemExists) {
        console.log('Товар уже в корзине, обновляем количество');
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        console.log('Новый товар, добавляем в корзину');
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    console.log('Содержимое корзины:', cartItems); // Лог для проверки содержимого корзины
  };

  // Функция для очистки корзины
  const clearCart = () => {
    setCartItems([]);
    console.log('Корзина очищена');
  };

  return <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
