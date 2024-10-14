import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsList from './components/ProductsList/ProductsList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsList />} />
      </Routes>
    </Router>
  );
};

export default App;
