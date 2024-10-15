import { useState, useEffect } from 'react'
import { fetchProducts } from '../../api/fakeStoreApi'

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reloadClick = () => {
    window.location.reload();
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
        <div key={product.id}>
          <img src={product.image} width="150"/><br></br>
          <span>{product.category}</span>
          <h3>{product.title}</h3>
          <span>Rate: {product.rating.rate}</span>
          <p>{product.description}</p>
          <p>{product.price} $</p>
          <button>More...</button>
          <button>Add to cart</button>
        </div>
      ))}
    </div>
  )
}

export default ProductsList
