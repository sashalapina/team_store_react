import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../api/fakeStoreApi'
import './ProductCard.css'

const ProductCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }  
    }
    getProduct();
  },[id])

  if (loading) {
    return <div className='loader'></div>;
  }

  if (!product) {
    return <div>Error loading the product with id {id}</div>;
  }

  return (
    <div className="product-card">
      <h1>{product.title}</h1>
      <p>Category: {product.category}</p>
      <img src={product.image} alt={product.title} style={{ width: '150px' }} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rate: {product.rating.rate} / 5</p>
      <button className='product-item-add-to-cart-button'>Add to cart</button>
    </div>
  )

};

export default ProductCard;
