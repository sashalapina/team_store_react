import React, { useEffect, useState } from 'react';
import { getCart, clearCart } from '../api/cartApi';
import styled from 'styled-components';
import Header from '../components/Header/Header';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = 1;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(userId);
        if (data && Array.isArray(data.products)) {
          setCartItems(data.products);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        setError('Ошибка при загрузке корзины');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  // Функция для очистки корзины
  const handleClearCart = async () => {
    try {
      await clearCart(userId);
      setCartItems([]);
    } catch (error) {
      alert('Ошибка при очистке корзины');
    }
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Header />
      <CartContainer>
        <h1>Корзина</h1>
        {cartItems.length === 0 ? (
          <EmptyCart>Ваша корзина пуста</EmptyCart>
        ) : (
          <>
            <CartList>
              {cartItems.map((item) => (
                <CartItem key={item.productId}>
                  <CartImage src={item.image} alt={item.title} />
                  <CartDetails>
                    <CartTitle>{item.title}</CartTitle>
                    <CartPrice>Цена: ${item.price}</CartPrice>
                    <CartQuantity>Количество: {item.quantity}</CartQuantity>
                  </CartDetails>
                </CartItem>
              ))}
            </CartList>
            <ClearButton onClick={handleClearCart}>Очистить корзину</ClearButton>
          </>
        )}
      </CartContainer>
    </>
  );
};

export default CartPage;

// Стили для страницы корзины
const CartContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CartImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const CartDetails = styled.div`
  flex-grow: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CartTitle = styled.h2`
  font-size: 18px;
  margin: 0;
  margin-bottom: 10px;
`;

const CartPrice = styled.p`
  font-size: 16px;
  color: #333;
`;

const CartQuantity = styled.p`
  font-size: 16px;
  color: #666;
`;

const ClearButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #c0392b;
  }
`;

const EmptyCart = styled.p`
  font-size: 18px;
  color: #888;
  text-align: center;
`;
