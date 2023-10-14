import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationBar } from './components/navigationbar';
// import { Shop } from './pages/shop/shop';
// import { Contact } from './pages/contact';
// import { Cart } from './pages/cart/cart';
import { Category } from './pages/category';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/menu" element={<Menu />} /> */}
          <Route path="/category" element={<Category />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
