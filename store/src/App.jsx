import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCardPage from './pages/ProductCardPage';
import ProductsListPage from './pages/ProductsListPage';
import ProductCategoryPage from './pages/ProductCategoryPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './components/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductsListPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductCardPage />} />
          <Route path="/products/:category" element={<ProductCategoryPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
