import LazyLoad from 'react-lazy-load';
import { useState, useEffect } from 'react';
import { fetchProductsCategories } from '../../api/fakeStoreApi';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductCategory.css'
import SliderTest  from '../Slider/Slider';

const ProductCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();
  const navigate = useNavigate();
  const link_category = category.replace(/_/g, ' ');

  const productCardOpen = (product) => {
    navigate(`/product/${product.id}`)
  }

  const categoryTitle = category.replace(/_/g, ' ');
  const newCategoryTitle = categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1);

  useEffect(() => {
    const getProducts = async () => {
        try {
            const data = await fetchProductsCategories(link_category);
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        } 
    }
    getProducts();
  },[link_category])

  if (loading) {
    return <div className='loader'></div>;
  }

  return (
    <>
    <>
      <h1 className='product-category__title'>{newCategoryTitle}</h1>
      {products.map((product) => (
        <LazyLoad key={product.id} height={280} offsetVertical={280}>
          <div className='product-category__item' key={product.id}>
            <div className='product-category__item-left'>
              <SliderTest images={[product.image]} />
            </div>
            <div className='product-category__item-right'>
              <h3 className='product-category__item-title'>{product.title}</h3>
              <span className='product-category__item-rate'>Rate: {product.rating.rate} / 5</span>
              <p className='product-category__item-price'>{product.price} $</p>
              <div className='product-category__item-buttons'>
                <button className='product-category__button product-category__button--more' onClick={() => productCardOpen(product)}>
                  More...
                </button>
                <button className='product-category__button product-category__button--add-to-cart'>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </LazyLoad>
      ))}
    </>
    </>
  )
}

export default ProductCategory;