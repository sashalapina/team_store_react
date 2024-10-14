import { useState, useEffect } from 'react'
import { fetchProducts } from '../../api/fakeStoreApi'

const ProductsList = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
        const data = await fetchProducts()
        setProducts(data)
    }

    getProducts()
  }, [])

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
