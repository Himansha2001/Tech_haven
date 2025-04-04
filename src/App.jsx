import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Parts from './pages/Parts';
import CustomPC from './pages/CustomPC';
import CustomBuild from './pages/CustomBuild';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import { FilterProvider } from './context/FilterContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <FilterProvider>
              <div className="flex flex-col min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/parts" element={<Parts />} />
                    <Route path="/custom-pc" element={<CustomPC />} />
                    <Route path="/custom-build" element={<CustomBuild />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </FilterProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App; 