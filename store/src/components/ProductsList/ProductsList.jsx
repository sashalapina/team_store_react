import { useState, useEffect } from 'react'
import { fetchProducts } from '../../api/fakeStoreApi'
import './ProductsList.css'


const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  const reloadClick = () => {
    window.location.reload();
  }

  const addToCart = (productID) => {
    setCart((prevCart => [...prevCart, productID]))
    console.log(cart);
  }

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
        
    }
    getProducts();
  }, [])

  if (loading) return <div className="loader"></div>;

  if (error) return (
    <div>
      <p className='error-text-message'>Error loading data, please try refreshing the page...</p>
      <button className='error-reload-button' onClick={reloadClick}>Reload</button>
    </div>
  )

  return (
    <div>
      <h1 className="catalog-title">Catalog</h1>
      {products.map((product) => (
        <>
        <div className="products-container">
          <div key={product.id}>
            <img src={product.image} width="150"/><br></br>
            <span>{product.category}</span>
            <h3>{product.title}</h3>
            <span>Rate: {product.rating.rate}</span>
            <p>{product.price} $</p>
            <button>More...</button>
            <button onClick={() => {addToCart(product.id)}}>Add to cart</button>
          </div>
        </div>         
        </> 
      ))}
    </div>
  )
}

export default ProductsList
