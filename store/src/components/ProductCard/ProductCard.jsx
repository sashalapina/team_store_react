import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} style={{ width: '150px', height: '150px' }} />
      <h3>{product.title}</h3>
      <p>Цена: ${product.price}</p>
      <p>Категория: {product.category}</p>
      <p>Рейтинг: {product.rating.rate} / 5</p>
      <Link to={`/product/${product.id}`}>Подробнее</Link>
    </div>
  );
};

export default ProductCard;
