import Header from '../components/Header/Header';
import ProductCard from '../components/ProductCard/ProductCard';
import Recommendations from '../components/Recommendations/Recommendations';

const ProductCardPage = () => {
  return (
    <>
      <Header />
      <main>
        <ProductCard />
        <Recommendations />
      </main>
    </>
  );
};

export default ProductCardPage;
