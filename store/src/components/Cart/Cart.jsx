import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchProductById } from '../../api/fakeStoreApi'; // Импорт функции получения товара по ID

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalPrice, setTotalPrice] = useState(0); // Общая сумма товаров в корзине

  const userId = 1; // ID пользователя

  // Функция для получения данных корзины
  const fetchCart = async () => {
    try {
      const cartResponse = await fetch(`https://fakestoreapi.com/carts/${userId}`);
      if (!cartResponse.ok) {
        throw new Error('Ошибка при загрузке корзины');
      }
      const cartData = await cartResponse.json();

      const productsResponse = await fetch('https://fakestoreapi.com/products');
      if (!productsResponse.ok) {
        throw new Error('Ошибка при загрузке продуктов');
      }
      const allProducts = await productsResponse.json();

      const matchedProducts = cartData.products.map((cartItem) => {
        const productData = allProducts.find((product) => product.id === cartItem.productId);
        return {
          ...productData,
          quantity: cartItem.quantity,
        };
      });

      setCartItems(matchedProducts);
      const total = matchedProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalPrice(total);
    } catch (err) {
      console.error('Ошибка при получении данных корзины:', err);
      setError('Ошибка загрузки данных корзины');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Функция для очистки корзины
  const clearCart = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/carts/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ошибка при очистке корзины');
      }

      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error('Ошибка при очистке корзины:', error);
      setError('Ошибка при очистке корзины');
    }
  };

  // Функция для изменения количества товаров в корзине
  const updateQuantity = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    const total = updatedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
    setCartItems(updatedCartItems);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <CartContainer>
      <h1>Корзина</h1>
      {cartItems.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <>
          <CartList>
            {cartItems.map((item) => (
              <CartItem key={item.id}>
                {' '}
                {/* Уникальный ключ для каждого элемента списка */}
                <ImageContainer>
                  <img src={item.image} alt={item.title} />
                </ImageContainer>
                <ItemDetails>
                  <h2>{item.title}</h2>
                  <p>Цена: ${item.price}</p>
                  <p>Количество:</p>
                  <QuantityControls>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </QuantityControls>
                </ItemDetails>
              </CartItem>
            ))}
          </CartList>
          <TotalPrice>Общая сумма: ${totalPrice.toFixed(2)}</TotalPrice>

          <ClearButton onClick={clearCart}>Очистить корзину</ClearButton>
        </>
      )}
    </CartContainer>
  );
};

// Стили для контейнера корзины и элементов
const CartContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const CartList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CartItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
`;

const ImageContainer = styled.div`
  width: 100px;
  margin-right: 20px;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  h2 {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  p {
    margin: 5px 0;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;

  button {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 5px 10px;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  span {
    margin: 0 10px;
    font-size: 1.2em;
  }
`;

const TotalPrice = styled.h3`
  text-align: right;
  font-size: 1.5em;
  margin-top: 20px;
`;

const ClearButton = styled.button`
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1em;
  margin-top: 20px;
  display: block;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #ff3333;
  }
`;

export default Cart;
