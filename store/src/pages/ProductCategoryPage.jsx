import Header from '../components/Header/Header';
import ProductCategory from '../components/ProductCategory/ProductCategory';
import Recommendations from '../components/Recommendations/Recommendations';

const ProductCategoryPage = () => {
  return (
    <>
      <Header />
      <main>
        <ProductCategory />
        <Recommendations />
      </main>
    </>
  );
};

export default ProductCategoryPage;