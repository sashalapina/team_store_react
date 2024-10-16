export const API_BASE_URL = 'https://fakestoreapi.com';

//функция для получаения списка всех товаров
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Произошла ошибка при загрузке товаров');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('fetchProducts:', error);
    throw error;
  }
};

//функция для получения товара по id
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке товара с ID: ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('fetchProductById:', error);
    throw error;
  }
};

//функция для получаения категорий
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error('Произошла ошибка при загрузке списка категорий');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('fetchCategories:', error);
    throw error;
  }
};

//функция для получаения товаров определенной категории
export const fetchProductsCategories = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!response.ok) {
      throw new Error(`Произошла ошибка при загрузке списка товаров категории ${category}`);
    }

    const data = await response.json();
    console.table(data);
    return data;
  } catch (error) {
    console.error('fetchProductsCategories:', error);
    throw error;
  }
};

// Функция для добавления товара в корзину
export const addToCart = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${id}`, { method: 'POST' });
    if (!response.ok) {
      throw new Error('Произошла ошибка при добавлении товара в корзину');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('addToCart:', error);
    throw error;
  }
};
