import { useState, useEffect } from 'react'
import { fetchProducts } from '../../api/fakeStoreApi'


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

  if (loading) return <div>Загрузка...</div>;

  if (error) return (
    <div>
      <p>Ошибка загрузки данных, попробуйте обновить страницу...</p>
      <button onClick={reloadClick}>Обновить</button>
    </div>
  )

  return (
    <div>
      {products.map((product) => (
        <>
        <div className="products-container">
          <div key={product.id}>
            <img src={product.image} width="150"/><br></br>
            <span>{product.category}</span>
            <h3>{product.title}</h3>
            <span>Rate: {product.rating.rate}</span>
            <p>{product.description}</p>
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
