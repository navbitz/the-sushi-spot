import { useState } from 'react';
import { Heart, Plus, Check, Info, ShoppingBag } from 'lucide-react';

/* ── Green dot = Veg  |  Red dot = Non-Veg  (Indian FSSAI standard) ── */
function VegBadge({ isVeg }) {
  return (
    <div
      title={isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
      className="w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0 bg-white dark:bg-black/20 shadow-sm"
      style={{ border: `1.5px solid ${isVeg ? '#1a8c3e' : '#c0392b'}` }}
    >
      <div
        className="w-2.5 h-2.5 rounded-full"
        style={{ background: isVeg ? '#1a8c3e' : '#c0392b' }}
      />
    </div>
  );
}

/* ─────────────────────── POPULAR CARD (Exact Reference Match) ─────────────────── */
export function PopularCard({ dish, onAddToCart, onViewDetail }) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(dish);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="popular-card group" onClick={() => onViewDetail(dish)}>
      <div className="popular-card-img-wrapper">
        <img src={dish.image} alt={dish.name} loading="lazy" decoding="async" className="drop-shadow-2xl transition-transform duration-300 group-hover:scale-105" />
      </div>

      <h3 className="text-[17px] font-800 mb-0.5" style={{ color: 'var(--color-dark)' }}>
        {dish.name}
      </h3>
      <p className="text-[11px] mb-5 font-600" style={{ color: 'var(--color-muted)' }}>
        Japanese Dish
      </p>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-[16px] font-800" style={{ color: 'var(--color-terracotta)' }}>
          ₹{dish.price}
        </span>
        <button
          onClick={handleAdd}
          className={`flex items-center justify-center gap-1.5 h-[44px] px-5 rounded-full text-[13px] font-700 transition-all ${justAdded ? 'bg-[var(--color-success)] text-white shadow-md' : 'btn-accent'}`}
          aria-label="Add to order"
        >
          {justAdded ? <><Check className="w-4 h-4" /> Added</> : <><Plus className="w-4 h-4" /> Add</>}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────── STANDARD GRID CARD ─────────────────────────────── */
export default function DishCard({ dish, onAddToCart, isFav, onToggleFav, onViewDetail }) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(dish);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      className="dish-card group"
      onClick={() => onViewDetail(dish)}
      style={{ cursor: 'pointer' }}
    >
      {/* Image area */}
      <div
        className="relative h-48 flex items-center justify-center"
        style={{ background: 'var(--color-cream-dark)' }}
      >
        {/* Top-left: veg marker */}
        <div className="absolute top-3 left-3 z-10">
          <VegBadge isVeg={dish.isVeg} />
        </div>

        {/* Badge */}
        {dish.badge && (
          <span
            className="absolute top-3 left-9 z-10 text-[10px] font-700 px-2 py-0.5 rounded-full"
            style={{ background: 'var(--color-terracotta)', color: '#fff' }}
          >
            {dish.badge}
          </span>
        )}

        {/* Fav */}
        <button
          onClick={e => { e.stopPropagation(); onToggleFav(dish.id); }}
          className={`fav-btn absolute top-3 right-3 z-10 p-1.5 rounded-full ${isFav ? 'active' : ''}`}
          style={{
            background: 'rgba(255,255,255,0.85)',
            color: isFav ? 'var(--color-terracotta)' : '#CCC',
          }}
          aria-label={isFav ? 'Remove favourite' : 'Add to favourites'}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>

        <img
          src={dish.image} alt={dish.name} loading="lazy" decoding="async"
          className="h-24 sm:h-36 w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-xl"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-[14px] sm:text-base font-700 leading-snug" style={{ color: 'var(--color-brown)' }}>
            {dish.name}
          </h3>
          <Info className="w-4 h-4 mt-0.5 ml-1 flex-shrink-0 opacity-30 group-hover:opacity-70 transition-opacity"
            style={{ color: 'var(--color-terracotta)' }} />
        </div>

        <p className="text-[10px] sm:text-[11px] mb-2" style={{ color: 'var(--color-muted)' }}>
          {dish.pieces} · {dish.isVeg ? '🌿 Veg' : '🐟 Non-Veg'}
        </p>

        <p className="text-[11px] sm:text-[12px] leading-relaxed flex-grow mb-4 line-clamp-2" style={{ color: 'var(--color-muted)' }}>
          {dish.description}
        </p>

        <div className="flex items-center justify-between" onClick={e => e.stopPropagation()}>
          <span className="text-[15px] sm:text-[18px] font-800" style={{ color: 'var(--color-terracotta)' }}>
            ₹{dish.price}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 h-[38px] sm:h-[44px] px-3 sm:px-5 rounded-full text-[12px] sm:text-[13px] font-700 transition-all ${justAdded ? 'bg-[var(--color-success)] text-white shadow-md' : 'btn-accent'}`}
          >
            {justAdded ? <><Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Added</span></> : <><Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Add</span></>}
          </button>
        </div>
      </div>
    </div>
  );
}
