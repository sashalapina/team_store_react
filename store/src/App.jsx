import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsListPage from './pages/ProductsListPage';
import CartPage from './pages/CartPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsListPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
};

export default App;
