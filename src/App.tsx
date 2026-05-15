import { Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import Cursor from './components/Cursor';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';

export default function App() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
