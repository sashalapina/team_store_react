import React from 'react';
import Cart from '../components/Cart/Cart'; // Импортируем компонент корзины
import Header from '../components/Header/Header'; // Импортируем Header

const CartPage = () => {
  return (
    <>
      <Header />
      <Cart />
    </>
  );
};

export default CartPage;
