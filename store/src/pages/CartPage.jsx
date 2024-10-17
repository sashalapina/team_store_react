import React, { useEffect, useState } from 'react';
import { fetchProductById } from '../api/fakeStoreApi';
import Header from '../components/Header/Header';
import styled from 'styled-components';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = 1;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Получаем корзину по ID пользователя
        const cartData = await getCartz(userId);
        if (!cartData.products || cartData.products.length === 0) {
          setError('Корзина пуста или данные недоступны');
          return;
        }

        const products = await Promise.all(
          cartData.products.map(async (item) => {
            try {
              const productData = await fetchProductById(item.productId);
              return {
                ...productData,
                quantity: item.quantity,
              };
            } catch (err) {
              console.error('Ошибка получения товара:', err);
              setError('Ошибка при загрузке товара');
              return null;
            }
          })
        );

        setCartItems(products.filter(Boolean));
      } catch (err) {
        console.error('Ошибка загрузки корзины:', err);
        setError('Ошибка загрузки корзины');
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
      setCartItems([]); // Очищаем состояние корзины
    } catch (error) {
      alert('Ошибка при очистке корзины');
    }
  };

  // Показ состояния загрузки
  if (loading) {
    return <p>Загрузка...</p>;
  }

  // Показ ошибки, если что-то пошло не так
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <CartContainer>
      <Header />
      <h1>Корзина</h1>
      {cartItems.length === 0 ? (
        <EmptyCart>Ваша корзина пуста</EmptyCart>
      ) : (
        <>
          <CartList>
            {cartItems.map((item) => (
              <CartItem key={item.id}>
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
  );
};

export default CartPage;

const CartContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const EmptyCart = styled.p`
  text-align: center;
  font-size: 18px;
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
`;

const CartImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const CartDetails = styled.div`
  margin-left: 20px;
`;

const CartTitle = styled.h2`
  font-size: 18px;
  margin: 0;
`;

const CartPrice = styled.p`
  font-size: 16px;
`;

const CartQuantity = styled.p`
  font-size: 14px;
  color: grey;
`;

const ClearButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    background-color: darkred;
  }
`;
