import { useState, useMemo } from 'react';
import { Plus, Minus, Check, Heart, Flame, Award, Search, X } from 'lucide-react';
import { menuItems, categories } from '../data/mockData';
import { useStore } from '../context/StoreContext';
import useInView from '../hooks/useInView';
import DishCard from './DishCard';

/* ── FSSAI Veg Badge (Green dot = Veg | Red dot = Non-Veg) ── */
function VegBadge({ isVeg }) {
  return (
    <div
      title={isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
      className="w-4 h-4 rounded-xs flex items-center justify-center flex-shrink-0 bg-white dark:bg-black/30 shadow-xs"
      style={{ border: `1.5px solid ${isVeg ? '#16a34a' : '#dc2626'}` }}
    >
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: isVeg ? '#16a34a' : '#dc2626' }}
      />
    </div>
  );
}

export default function Menu({ onViewDetail }) {
  const { cartItems, favourites, handleAddToCart, handleRemoveOne, handleToggleFav } = useStore();
  const [headerRef, headerVisible] = useInView();
  const [stageRef, stageVisible] = useInView({ threshold: 0.05 });
  const [menuRef, menuVisible] = useInView({ threshold: 0.05 });

  const [heroAdded, setHeroAdded] = useState(false);
  const [sideAddedId, setSideAddedId] = useState(null);

  // Flagship Hero Dish (Spicy Tuna Roll or Dragon Roll)
  const heroDish = menuItems.find(i => i.name === 'Spicy Tuna Roll') || menuItems[2];
  const sideDishes = menuItems.filter(i => i.id !== heroDish.id && (i.isChefsPick || i.badge)).slice(0, 2);

  const heroCartItem = cartItems.find(i => i.id === heroDish.id);
  const heroQty = heroCartItem ? heroCartItem.quantity : 0;

  const handleAddHero = (e) => {
    e.stopPropagation();
    handleAddToCart(heroDish);
    setHeroAdded(true);
    setTimeout(() => setHeroAdded(false), 1200);
  };

  const handleAddSide = (e, dish) => {
    e.stopPropagation();
    handleAddToCart(dish);
    setSideAddedId(dish.id);
    setTimeout(() => setSideAddedId(null), 1200);
  };

  const isHeroFav = favourites.includes(heroDish.id);

  // --- Full Menu Logic ---
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [gridKey, setGridKey] = useState(0);

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

  return (
    <section id="menu" className="py-16 sm:py-24 lg:py-28 bg-[var(--color-cream)] transition-colors relative overflow-hidden">
      
      {/* Background Soft Accent Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-terracotta-pale)] blur-[100px] rounded-full pointer-events-none opacity-50 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Section Header */}
        <div ref={headerRef} data-visible={headerVisible} className="reveal-up text-center mb-10 sm:mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-800 tracking-widest uppercase mb-3 backdrop-blur-md shadow-xs border border-[var(--color-terracotta)]/20"
            style={{ background: 'var(--color-terracotta-pale)', color: 'var(--color-terracotta)' }}
          >
            <Award className="w-4 h-4" /> Chef's Showcase
          </div>
          <h2 className="text-3xl sm:text-5xl font-900 tracking-tight" style={{ color: 'var(--color-dark)', fontFamily: 'var(--font-display)' }}>
            The Best Food
          </h2>
          <p className="text-sm sm:text-base font-500 max-w-lg mx-auto mt-2" style={{ color: 'var(--color-muted)' }}>
            Our most celebrated Edomae creations, prepared daily with passion.
          </p>
        </div>

        {/* Spotlight Stage Layout */}
        <div
          ref={stageRef}
          data-visible={stageVisible}
          className="reveal-up grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
        >
          {/* Main Featured Hero Card (5 columns) */}
          <div
            onClick={() => onViewDetail(heroDish)}
            className="lg:col-span-5 bg-[var(--color-surface)] rounded-3xl p-6 sm:p-7 border border-stone-200/80 dark:border-stone-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_40px_rgba(224,83,38,0.12)] hover:border-[var(--color-terracotta)]/40 transition-all duration-500 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
          >
            {/* Top Badges Bar */}
            <div className="flex items-center justify-between z-10 mb-2">
              <div className="flex items-center gap-2">
                <VegBadge isVeg={heroDish.isVeg} />
                <span className="text-[11px] sm:text-[12px] font-800 px-3 py-1 rounded-full bg-[var(--color-terracotta)] text-white shadow-sm flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> #1 MOST POPULAR
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={e => { e.stopPropagation(); handleToggleFav(heroDish.id); }}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isHeroFav
                      ? 'bg-[var(--color-terracotta)] text-white shadow-md scale-105'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-[var(--color-terracotta)] hover:bg-stone-200/80 dark:hover:bg-stone-700'
                  }`}
                  aria-label="Favorite"
                >
                  <Heart className={`w-4 h-4 ${isHeroFav ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Seamless Dish Image Stage */}
            <div className="relative h-48 sm:h-56 my-3 flex items-center justify-center bg-[var(--color-cream-dark)]/40 dark:bg-stone-900/40 rounded-2xl p-4 transition-all duration-500 group-hover:bg-[var(--color-terracotta-pale)]/50">
              <img
                src={heroDish.image}
                alt={heroDish.name}
                loading="lazy"
                decoding="async"
                className="h-full w-auto object-contain transition-all duration-500 filter drop-shadow-md z-10"
              />
            </div>

            {/* Dish Details */}
            <div className="z-10 mt-2">
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <h3 className="text-xl sm:text-2xl font-900 tracking-tight transition-colors group-hover:text-[var(--color-terracotta)]" style={{ color: 'var(--color-dark)', fontFamily: 'var(--font-display)' }}>
                  {heroDish.name}
                </h3>
                <span className="text-[11px] sm:text-[12px] font-700 px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 shrink-0" style={{ color: 'var(--color-muted)' }}>
                  {heroDish.pieces || '6 pcs'}
                </span>
              </div>
              <p className="text-[12px] sm:text-[13px] font-500 line-clamp-2 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {heroDish.description}
              </p>
            </div>

            {/* Price & Action Control Row */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-stone-100 dark:border-stone-800/60 z-10" onClick={e => e.stopPropagation()}>
              <div>
                <span className="block text-[9px] font-800 uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>Price</span>
                <span className="text-2xl sm:text-3xl font-900 text-[var(--color-terracotta)] font-mono">
                  ₹{heroDish.price}
                </span>
              </div>

              {heroQty > 0 ? (
                <div className="flex items-center justify-between h-9 sm:h-11 w-24 sm:w-28 rounded-full text-[13px] sm:text-[14px] font-800 bg-[var(--color-terracotta)] text-white shadow-md overflow-hidden">
                  <button onClick={e => { e.stopPropagation(); handleRemoveOne(heroDish.id); }} className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-5 text-center font-mono">{heroQty}</span>
                  <button onClick={handleAddHero} className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddHero}
                  className={`flex items-center justify-center gap-1.5 h-9 sm:h-11 px-5 sm:px-6 rounded-full text-[12px] sm:text-[13px] font-800 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 ${
                    heroAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[var(--color-terracotta)] text-white hover:bg-[var(--color-terracotta-light)]'
                  }`}
                >
                  {heroAdded ? <><Check className="w-4 h-4" /> Added</> : <><Plus className="w-4 h-4" /> Add to Order</>}
                </button>
              )}
            </div>
          </div>

          {/* Secondary Spotlight Stack Cards (7 columns) */}
          <div className="lg:col-span-7 grid grid-rows-2 gap-5 sm:gap-6">
            {sideDishes.map((dish) => {
              const cartItem = cartItems.find(i => i.id === dish.id);
              const qty = cartItem ? cartItem.quantity : 0;
              const isAdded = sideAddedId === dish.id;
              const isFav = favourites.includes(dish.id);

              return (
                <div
                  key={dish.id}
                  onClick={() => onViewDetail(dish)}
                  className="bg-[var(--color-surface)] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-stone-200/80 dark:border-stone-800/80 shadow-[0_6px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_36px_rgba(224,83,38,0.1)] hover:border-[var(--color-terracotta)]/40 transition-all duration-500 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 cursor-pointer group relative overflow-hidden"
                >
                  <div className="w-full sm:w-48 h-40 sm:h-40 rounded-xl sm:rounded-2xl bg-[var(--color-cream-dark)]/40 dark:bg-stone-900/40 p-3 sm:p-4 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-terracotta-pale)]/50 transition-colors duration-500 z-10">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain transition-all duration-500 filter drop-shadow-xs"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1 sm:py-2 z-10">
                      <div>
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <div className="flex items-center gap-2">
                            <VegBadge isVeg={dish.isVeg} />
                            {dish.badge && (
                              <span className="text-[10px] sm:text-[11px] font-800 px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200/50 dark:border-stone-700">
                                {dish.badge}
                              </span>
                            )}
                            <span className="text-[11px] sm:text-[12px] font-600" style={{ color: 'var(--color-muted)' }}>
                              {dish.pieces || '2 pcs'}
                            </span>
                          </div>

                          <button
                            onClick={e => { e.stopPropagation(); handleToggleFav(dish.id); }}
                            className={`p-1.5 rounded-full transition-all duration-300 ${
                              isFav ? 'bg-[var(--color-terracotta)] text-white shadow-xs' : 'text-stone-400 hover:text-[var(--color-terracotta)]'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                          </button>
                        </div>

                        <h4 className="text-[18px] sm:text-[21px] font-800 tracking-tight group-hover:text-[var(--color-terracotta)] transition-colors truncate mb-1" style={{ color: 'var(--color-dark)', fontFamily: 'var(--font-display)' }}>
                          {dish.name}
                        </h4>
                        <p className="text-[12px] sm:text-[13px] font-500 line-clamp-2 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                          {dish.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-3 sm:pt-4 border-t border-stone-100 dark:border-stone-800/60 w-full">
                        <div>
                          <span className="block text-[9px] font-800 uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>Price</span>
                          <span className="text-xl sm:text-2xl font-900 text-[var(--color-terracotta)] font-mono">
                            ₹{dish.price}
                          </span>
                        </div>

                        <div onClick={e => e.stopPropagation()}>
                          {qty > 0 ? (
                            <div className="flex items-center justify-between h-8 sm:h-9 w-22 sm:w-24 rounded-full text-[12px] sm:text-[13px] font-800 bg-[var(--color-terracotta)] text-white shadow-xs overflow-hidden">
                              <button onClick={e => { e.stopPropagation(); handleRemoveOne(dish.id); }} className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-colors">
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-4 text-center font-mono">{qty}</span>
                              <button onClick={e => handleAddSide(e, dish)} className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-colors">
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={e => handleAddSide(e, dish)}
                              className={`flex items-center justify-center gap-1.5 h-8 sm:h-9 px-4 sm:px-5 rounded-full text-[12px] sm:text-[13px] font-800 transition-all duration-300 shadow-xs active:scale-95 ${
                                isAdded
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-[var(--color-terracotta)] text-white hover:bg-[var(--color-terracotta-light)]'
                              }`}
                            >
                              {isAdded ? <Check className="w-3.5 h-3.5" /> : <><Plus className="w-3.5 h-3.5" /> Add</>}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
        </div>

        {/* --- UNIFIED FULL MENU SECTION --- */}
        <div ref={menuRef} data-visible={menuVisible} className="max-w-6xl mx-auto mt-24 reveal-up">
           {/* Title & Search */}
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-[11px] font-800 tracking-wider text-[var(--color-terracotta)] uppercase block mb-1">
                  Explore Everything
                </span>
                <h3 className="text-2xl sm:text-3xl font-900 tracking-tight" style={{ color: 'var(--color-dark)', fontFamily: 'var(--font-display)' }}>
                  Full Menu
                </h3>
              </div>
              
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--color-terracotta)' }} />
                <input
                  type="text"
                  className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full text-[13px] py-2.5 pl-10 pr-8 outline-none focus:border-[var(--color-terracotta)]/50 transition-colors"
                  placeholder="Search sushi, rolls, combos..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[var(--color-terracotta)]">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
           </div>

           {/* Category Tabs */}
           <div className="flex gap-2 overflow-x-auto pb-2.5 mb-6 scrollbar-none">
             {allCategories.map(cat => (
               <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setGridKey(k => k + 1); }}
                  className={`px-4 py-2 rounded-full text-[13px] font-700 whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-[var(--color-terracotta)] text-white shadow-md'
                      : 'bg-white dark:bg-stone-800 text-[var(--color-muted)] hover:text-[var(--color-dark)] border border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {cat === '❤️ Favorites' ? `❤️ Favorites (${favourites.length})` : cat}
                </button>
             ))}
           </div>

           {/* Dish Grid */}
           {filtered.length > 0 ? (
             <div key={gridKey} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 anim-grid-swap">
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
             <div className="py-16 text-center rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/60 p-6">
               <p className="text-[14px] mb-3 font-500" style={{ color: 'var(--color-muted)' }}>No dishes found matching "{searchQuery || activeCategory}"</p>
               <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="text-[13px] font-800 text-[var(--color-terracotta)] hover:underline">
                 Reset Filters & View All
               </button>
             </div>
           )}
        </div>

      </div>
    </section>
  );
}
