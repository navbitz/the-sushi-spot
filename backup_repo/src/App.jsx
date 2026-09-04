import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ReservationSection from './components/ReservationSection';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import Location from './components/Location';
import FAQ from './components/FAQ';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import CheckoutModal from './components/CheckoutModal';
import DishModal from './components/DishModal';
import OrderTrackerModal from './components/OrderTrackerModal';
import { useStore } from './context/StoreContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  const { clearCart } = useStore();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const handleCheckout = (finalTotal) => {
    setCheckoutTotal(finalTotal);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsCheckoutOpen(false);
    setIsTrackerOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-cream)' }} className="text-[var(--color-dark)] max-w-[1920px] mx-auto border-x border-black/5 dark:border-white/5 relative bg-[var(--color-cream)] shadow-[0_0_60px_rgba(0,0,0,0.02)]">

      {/* ── MAIN CONTENT ── */}
      <div className="transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
        <Navbar setIsCartOpen={setIsCartOpen} />
        <main>
          <Hero />
          <Menu
            onViewDetail={setSelectedDish}
            onOpenCart={() => setIsCartOpen(true)}
          />
          <ReservationSection />
          <Reviews />
          <Location />
          <FAQ />
        </main>
        <Footer />
      </div>

      {/* Global Modals — always mounted so cart/dish state persists across views */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <DishModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        finalTotal={checkoutTotal}
        onSuccess={handlePaymentSuccess}
      />

      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => { setIsTrackerOpen(false); clearCart(); }}
        finalTotal={checkoutTotal}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}

export default App;
