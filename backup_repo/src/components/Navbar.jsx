import { ShoppingBag, Menu as MenuIcon, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

export default function Navbar({ setIsCartOpen }) {
  const { cartItems } = useStore();
  const cartItemCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark';
    } catch {
      return false;
    }
  });

  const toggleDark = () => {
    const html = document.documentElement;
    const isDarkNow = html.classList.toggle('dark');
    setDark(isDarkNow);
    try {
      localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
    } catch {}
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const links = [
    { href: '#home', label: 'Home' },
    { href: '#menu', label: 'Menu' },
    { href: '#reservation', label: 'Reservations' },
    { href: '#location', label: 'Location' },
  ];

  return (
    <>
      {/* Edge-to-Edge Minimalist Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-lg border-b border-black/5 dark:border-white/10 shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-14 w-full flex items-center justify-between">
          
          {/* Logo Section */}
          <a href="#home" className="flex items-center gap-2 group shrink-0">
            <img src="/img/logo.png" alt="The Sushi Spot" className="h-6 w-6 object-contain" />
            <span className="text-[17px] font-800 tracking-tight text-[var(--color-dark)] group-hover:text-[var(--color-terracotta)] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
              The Sushi Spot
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={(e) => handleScrollTo(e, link.href.slice(1))}
                className="text-[13px] font-700 uppercase tracking-widest text-[var(--color-dark)] hover:text-[var(--color-terracotta)] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[var(--color-terracotta)] after:transition-all hover:after:w-full"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            
            {/* Quick Reserve CTA */}
            <a
              href="#reservation"
              className="hidden lg:inline-flex items-center justify-center px-6 py-2.5 text-[12px] font-800 uppercase tracking-widest rounded-full bg-[var(--color-terracotta)] text-white hover:bg-[var(--color-terracotta-light)] transition-colors shadow-sm"
            >
              Book Table
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-full transition-colors hover:bg-black/5 text-[var(--color-dark)]"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full transition-colors hover:bg-black/5 text-[var(--color-dark)]"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="sr-only">Open Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--color-terracotta)] text-white text-[10px] font-900 rounded-full flex items-center justify-center border border-white">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden p-2 rounded-full transition-colors hover:bg-black/5 text-[var(--color-dark)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Edge-to-Edge Mobile Dropdown */}
      <div 
        className={`fixed inset-x-0 top-[60px] z-[90] transition-all duration-300 overflow-hidden bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-lg border-b border-black/5 dark:border-white/10 shadow-md md:hidden ${scrolled ? 'top-[53px]' : 'top-[68px]'}`}
        style={{
          maxHeight: mobileOpen ? '300px' : '0',
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <div className="flex flex-col px-6 py-2">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={(e) => handleScrollTo(e, link.href.slice(1))}
              className="py-4 text-[14px] font-800 uppercase tracking-widest border-b border-black/5 text-[var(--color-dark)] hover:text-[var(--color-terracotta)] transition-colors text-left"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={(e) => handleScrollTo(e, 'reservation')}
            className="w-full text-center py-3.5 mt-2 text-[13px] font-800 uppercase tracking-widest btn-accent rounded-full"
          >
            Book Table
          </button>
        </div>
      </div>
    </>
  );
}
