// src/api/cartApi.js
import { API_BASE_URL } from './fakeStoreApi';

// Получить текущую корзину пользователя
export const getCart = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/user/${userId}`);
    if (!response.ok) {
      throw new Error('Ошибка при получении корзины');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('getCart:', error);
    throw error;
  }
};

// Добавить товар в корзину
export const addToCart = async (userId, productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        products: [{ productId, quantity: 1 }],
      }),
    });
    if (!response.ok) {
      throw new Error('Ошибка при добавлении товара в корзину');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('addToCart:', error);
    throw error;
  }
};

// Очистить корзину
export const clearCart = async (cartId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${cartId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Ошибка при очистке корзины');
    }
  } catch (error) {
    console.error('clearCart:', error);
    throw error;
  }
};
