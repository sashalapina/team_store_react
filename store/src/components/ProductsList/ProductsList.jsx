import { useState, useEffect } from 'react';
import { fetchProducts } from '../../api/fakeStoreApi';
import { useNavigate } from 'react-router-dom';
import './ProductsList.css';
import { addToCart } from '../../api/fakeStoreApi';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const reloadClick = () => {
    window.location.reload();
  };

  const productCardOpen = (product) => {
    navigate(`product/${product.id}`);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) return <div className="loader"></div>;

  if (error)
    return (
      <div>
        <p className="error-text-message">Error loading data, please try refreshing the page...</p>
        <button className="error-reload-button" onClick={reloadClick}>
          Reload
        </button>
      </div>
    );

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Catalog</h1>
      {products.map((product) => (
        <>
          <div className="product-container" key={product.id}>
            <div className="product-left-column">
              <img className="product-item-img" src={product.image} />
            </div>
            <div className="product-right-column">
              <h3 className="product-item-title">{product.title}</h3>
              <span>{product.category}</span>
              <br></br>
              <span>Rate: {product.rating.rate}</span>
              <p>{product.price} $</p>
              <div className="product-buttons-group">
                <button className="product-more-button" onClick={() => productCardOpen(product)}>
                  More...
                </button>
                <button className="product-add-to-cart-button" onClick={() => addToCart(product)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default ProductsList;
