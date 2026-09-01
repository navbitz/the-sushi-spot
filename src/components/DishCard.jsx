import { useState } from 'react';
import { Heart, Plus, Check, Info } from 'lucide-react';

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
        <img src={dish.image} alt={dish.name} loading="lazy" decoding="async" className="transition-transform duration-300 group-hover:scale-105" />
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
      className="dish-card group relative pt-10"
      onClick={() => onViewDetail(dish)}
      style={{ cursor: 'pointer' }}
    >
      {/* Absolute Badges */}
      <div className="absolute top-4 left-4 z-10">
        <VegBadge isVeg={dish.isVeg} />
      </div>

      {dish.badge && (
        <span
          className="absolute top-4 left-11 z-10 text-[10px] font-700 px-2 py-0.5 rounded-full"
          style={{ background: 'var(--color-terracotta)', color: '#fff' }}
        >
          {dish.badge}
        </span>
      )}

      {/* Fav button */}
      <button
        onClick={e => { e.stopPropagation(); onToggleFav(dish.id); }}
        className={`fav-btn absolute top-4 right-4 z-10 p-2 rounded-full ${isFav ? 'active' : ''} bg-white shadow-sm dark:bg-[var(--color-surface)]`}
        style={{
          color: isFav ? 'var(--color-terracotta)' : 'var(--color-muted)',
        }}
        aria-label={isFav ? 'Remove favourite' : 'Add to favourites'}
      >
        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
      </button>

      {/* Breakout Image Area */}
      <div className="relative h-40 flex items-center justify-center -mt-16 mb-4">
        <img
          src={dish.image} alt={dish.name} loading="lazy" decoding="async"
          className="h-32 sm:h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-xl"
        />
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col pt-0 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <h3 className="text-[17px] font-800 text-[var(--color-dark)] opacity-100">
            {dish.name}
          </h3>
        </div>
        <p className="text-[13px] font-500 text-[var(--color-dark)] opacity-75 mb-3 line-clamp-2">
          {dish.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5 dark:border-white/5">
          <span className="text-[17px] font-800 text-[var(--color-dark)] opacity-100">
            ₹{dish.price}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center justify-center w-9 h-9 rounded-full transition-all ${justAdded ? 'bg-[var(--color-success)] text-white shadow-md scale-110' : 'bg-[var(--color-cream-dark)] text-[var(--color-dark)] hover:bg-[var(--color-terracotta)] hover:text-white'}`}
            aria-label="Add to order"
          >
            {justAdded ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
