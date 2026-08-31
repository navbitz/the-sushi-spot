import { useState, useMemo, useEffect } from 'react';
import { Search, X, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import DishCard from './DishCard';
import { menuItems, categories } from '../data/mockData';
import { useStore } from '../context/StoreContext';

export default function FullMenuPage({ onBack, onViewDetail, onOpenCart }) {
  const { cartItems, favourites, handleAddToCart, handleToggleFav } = useStore();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [gridKey, setGridKey] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filtered = useMemo(() => {
    return menuItems.filter(item => {
      let matchCat = false;
      if (activeCategory === 'All') matchCat = true;
      else if (activeCategory === '🌿 Veg') matchCat = item.isVeg;
      else matchCat = item.category === activeCategory;

      const q = searchQuery.toLowerCase();
      const matchSearch = !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <div className="min-h-screen transition-colors anim-page-enter" style={{ background: 'var(--color-cream-dark)' }}>

      {/* Sticky Top Bar */}
      <div
        className="sticky top-0 z-50 flex items-center px-4 sm:px-5 lg:px-14 py-3 sm:py-4 border-b border-black/5 dark:border-white/10 backdrop-blur-lg"
        style={{ background: 'var(--color-cream-dark)', opacity: 0.97 }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[13px] font-700 text-[var(--color-dark)] hover:text-[var(--color-terracotta)] transition-colors group"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        <h1
          className="absolute left-1/2 -translate-x-1/2 text-[17px] font-900"
          style={{ color: 'var(--color-dark)', fontFamily: 'var(--font-display)' }}
        >
          Full Menu
        </h1>

        <div className="ml-auto">
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 text-[13px] font-700 text-[var(--color-dark)] hover:text-[var(--color-terracotta)] transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--color-terracotta)] text-white text-[10px] font-900 rounded-full flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-5 lg:px-14 py-6 sm:py-10">

        {/* Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <p className="section-eyebrow">Our Menu</p>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--color-terracotta)' }} />
            <input
              type="text"
              className="search-input"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }}>
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6" style={{ scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setGridKey(k => k + 1); }}
              className={`filter-tab whitespace-nowrap ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count + legend */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[12px] font-600" style={{ color: 'var(--color-muted)' }}>
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
          </p>
          <div className="flex items-center gap-4 text-[11px] font-600" style={{ color: 'var(--color-muted)' }}>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm inline-flex items-center justify-center" style={{ border: '2px solid #1a8c3e' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-700 block" />
              </span>
              Vegetarian
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm inline-flex items-center justify-center" style={{ border: '2px solid #c0392b' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-red-700 block" />
              </span>
              Non-Veg
            </span>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div key={gridKey} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(item => (
              <DishCard
                key={item.id}
                dish={item}
                onAddToCart={handleAddToCart}
                isFav={favourites.includes(item.id)}
                onToggleFav={handleToggleFav}
                onViewDetail={onViewDetail}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-2xl bg-[var(--color-surface)] transition-colors">
            <p className="text-[15px] mb-3" style={{ color: 'var(--color-muted)' }}>
              No results for &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="text-[13px] font-700 underline underline-offset-4"
              style={{ color: 'var(--color-terracotta)' }}
            >
              Clear filters
            </button>
          </div>
        )}

        {cartCount > 0 && <div className="h-28" />}
      </div>

      {/* Sticky Bottom Cart Bar */}
      {cartCount > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 px-4 sm:px-5 lg:px-14 py-4 border-t border-black/5 dark:border-white/10 backdrop-blur-lg"
          style={{ background: 'var(--color-cream-dark)', opacity: 0.97 }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(224,83,38,0.1)' }}>
                <span className="font-900 text-base text-[var(--color-terracotta)]">{cartCount}</span>
              </div>
              <div>
                <p className="text-[13px] font-700 text-[var(--color-dark)]">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} in cart
                </p>
                <p className="text-[11px] font-600" style={{ color: 'var(--color-muted)' }}>
                  Subtotal: <span style={{ color: 'var(--color-terracotta)' }}>₹{cartSubtotal.toFixed(2)}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onOpenCart}
              className="btn-accent py-3 px-6 rounded-full text-[13px] flex items-center gap-2"
            >
              View Cart & Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
