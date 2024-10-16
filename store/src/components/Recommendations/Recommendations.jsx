import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Recommendation.css';

const Recommendations = ({ currentProductId }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    // Получаем все товары из API
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        const products = response.data;
        // Фильтруем текущий товар и выбираем 4 случайных товара
        const filteredProducts = products.filter((product) => product.id !== parseInt(currentProductId));
        const randomProducts = filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
        setRecommendedProducts(randomProducts);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке рекомендаций:', error);
      });
  }, [currentProductId]);

  return (
    <div className="recommendations">
      <h3>Рекомендуемые товары</h3>
      <div className="recommendations-list">
        {recommendedProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="recommendation-item">
            <img src={product.image} alt={product.title} />
            <div className="recommendation-details">
              <p className="recommendation-title">{product.title}</p>
              <p className="recommendation-price">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
