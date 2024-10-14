const API_BASE_URL = 'https://fakestoreapi.com'

//функция для получаения списка всех товаров
/**
 * get all products from https://fakestoreapi.com
 * @returns {Promise<Array>}
 */
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`)
    if (!response.ok) {
      throw new Error('Произошла ошибка при загрузке товаров')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('fetchProducts:', error)
    throw error
  }
}

//функция для получения товара по id
/**
 * get item from https://fakestoreapi.com by ID
 * @param {number|string} id - product ID
 * @returns {Promise<Object>}
 */
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке товара с ID: ${id}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('fetchProductById:', error)
    throw error
  }
}
