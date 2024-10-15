import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCardPage from './pages/ProductCardPage';
import ProductsListPage from './pages/ProductsListPage';
import CartPage from './pages/CartPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsListPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductCardPage />}/>
      </Routes>
    </Router>
  );
};

export default App;
