import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ReservationSection from './components/ReservationSection';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import Location from './components/Location';
import FAQ from './components/FAQ';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import DishModal from './components/DishModal';
import OrderTrackerModal from './components/OrderTrackerModal';
import ReservationModal from './components/ReservationModal';
import FullMenuPage from './components/FullMenuPage';
import { useStore } from './context/StoreContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [showFullMenuPage, setShowFullMenuPage] = useState(false);

  const { clearCart } = useStore();

  const handleCheckout = (finalTotal) => {
    setCheckoutTotal(finalTotal);
    setIsCartOpen(false);
    setIsTrackerOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-cream)' }} className="text-[var(--color-dark)] max-w-[1920px] mx-auto border-x border-black/5 dark:border-white/5 relative bg-[var(--color-cream)] shadow-[0_0_60px_rgba(0,0,0,0.02)]">

      {/* ── MAIN CONTENT ── */}
      <div 
        className="transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ 
          opacity: showFullMenuPage ? 0 : 1, 
          pointerEvents: showFullMenuPage ? 'none' : 'auto' 
        }}
      >
        <Navbar setIsCartOpen={setIsCartOpen} />
        <main>
          <Hero />
          <Menu
            onViewDetail={setSelectedDish}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenFullMenu={() => setShowFullMenuPage(true)}
          />
          <ReservationSection />
          <Reviews />
          <Location />
          <FAQ />
        </main>
        <Footer />
      </div>

      {/* ── FULL MENU OVERLAY ── */}
      <div 
        id="full-menu-overlay"
        className={`fixed inset-0 z-50 bg-[var(--color-cream-dark)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-y-auto ${showFullMenuPage ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <FullMenuPage
          onBack={() => setShowFullMenuPage(false)}
          onViewDetail={setSelectedDish}
          onOpenCart={() => setIsCartOpen(true)}
          isOpen={showFullMenuPage}
        />
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
