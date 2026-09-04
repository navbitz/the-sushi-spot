import { useState, useMemo, useEffect } from 'react';
import { Search, X, ArrowRight, ArrowLeft, ShoppingBag, Heart } from 'lucide-react';
import DishCard from './DishCard';
import { menuItems, categories } from '../data/mockData';
import { useStore } from '../context/StoreContext';

export default function FullMenuPage({ onBack, onViewDetail, onOpenCart, isOpen, initialCategory }) {
  const { cartItems, favourites, handleAddToCart, handleToggleFav } = useStore();

  const targetCategory = typeof initialCategory === 'string' ? initialCategory : 'All';
  const [activeCategory, setActiveCategory] = useState(targetCategory);
  const [prevInitial, setPrevInitial] = useState(initialCategory);

  if (initialCategory !== prevInitial) {
    setPrevInitial(initialCategory);
    setActiveCategory(targetCategory);
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [gridKey, setGridKey] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.getElementById('full-menu-overlay')?.scrollTo(0, 0);
    }
  }, [isOpen]);

  const allCategories = useMemo(() => {
    return ['All', '❤️ Favorites', '🌿 Veg', ...categories.filter(c => c !== 'All' && c !== '🌿 Veg')];
  }, []);

  const filtered = useMemo(() => {
    return menuItems.filter(item => {
      let matchCat = false;
      if (activeCategory === 'All') matchCat = true;
      else if (activeCategory === '❤️ Favorites') matchCat = favourites.includes(item.id);
      else if (activeCategory === '🌿 Veg') matchCat = item.isVeg;
      else matchCat = item.category === activeCategory;

      const q = searchQuery.toLowerCase();
      const matchSearch = !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery, favourites]);

  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <div className="min-h-screen transition-colors anim-page-enter" style={{ background: 'var(--color-cream-dark)' }}>

      {/* Sticky Top Bar */}
      <div
        className="sticky top-0 z-50 flex items-center px-4 sm:px-5 lg:px-14 py-2.5 sm:py-4 border-b border-black/5 dark:border-white/10 backdrop-blur-lg"
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

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => { setActiveCategory('❤️ Favorites'); setGridKey(k => k + 1); }}
            className="relative p-1.5 rounded-full text-[var(--color-dark)] hover:text-[var(--color-terracotta)] transition-colors"
            aria-label="View Favorites"
            title="View Favorites"
          >
            <Heart className={`w-5 h-5 ${favourites.length > 0 ? 'fill-[var(--color-terracotta)] text-[var(--color-terracotta)]' : ''}`} />
            {favourites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-terracotta)] text-white text-[10px] font-900 rounded-full flex items-center justify-center border border-white">
                {favourites.length}
              </span>
            )}
          </button>

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
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setGridKey(k => k + 1); }}
              className={`filter-tab whitespace-nowrap ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat === '❤️ Favorites' ? `❤️ Favorites (${favourites.length})` : cat}
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
          <div key={gridKey} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 anim-grid-swap">
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
              {activeCategory === '❤️ Favorites'
                ? 'No favorites saved yet! Click the ❤️ icon on any dish to save it here.'
                : `No results for "${searchQuery || activeCategory}"`}
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

      {/* Floating Bottom Cart Bar */}
      {cartCount > 0 && (
        <div className="sticky bottom-4 sm:bottom-6 left-0 right-0 z-50 px-4 sm:px-5 flex justify-center pointer-events-none mt-8">
          <div className="pointer-events-auto flex items-center justify-between bg-[#1f2937] dark:bg-[#2A2A2A] rounded-full p-2 pl-6 shadow-2xl w-full max-w-md border border-white/10">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-white/90" />
              <div className="flex flex-col">
                <span className="text-white font-700 text-[14px] leading-tight">
                  {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
                </span>
                <span className="text-white/70 font-600 text-[12px] leading-tight">
                  ₹{cartSubtotal.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={onOpenCart}
              className="bg-[var(--color-terracotta)] text-white font-700 text-[13px] px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-[var(--color-terracotta-light)] transition-colors ml-4"
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
