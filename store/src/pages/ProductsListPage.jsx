import Header from '../components/Header/Header';
import ProductsList from '../components/ProductsList/ProductsList';
import Recommendations from '../components/Recommendations/Recommendations';

const ProductsListPage = () => {
  return (
    <>
      <Header />
      <main>
        <ProductsList />
        <Recommendations />
      </main>
    </>
  );
};

export default ProductsListPage;
