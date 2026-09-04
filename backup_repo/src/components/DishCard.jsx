import { useState } from 'react';
import { Heart, Plus, Minus, Check, Info } from 'lucide-react';
import { useStore } from '../context/StoreContext';

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

export function PopularCard({ dish, isFav, onToggleFav, onViewDetail }) {
  const [justAdded, setJustAdded] = useState(false);
  const { cartItems, handleAddToCart, handleRemoveOne } = useStore();
  const cartItem = cartItems.find(i => i.id === dish.id);
  const qty = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    handleAddToCart(dish);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    handleRemoveOne(dish.id);
  };

  return (
    <div
      onClick={() => onViewDetail(dish)}
      className="bg-[var(--color-surface)] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-stone-200/60 dark:border-stone-800/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
    >
      {/* Top Bar: Veg Badge, Custom Tag, and Heart Fav */}
      <div className="flex items-center justify-between mb-2 z-10">
        <div className="flex items-center gap-1.5">
          <VegBadge isVeg={dish.isVeg} />
          {dish.badge && (
            <span className="text-[9px] sm:text-[10px] font-800 px-2 py-0.5 rounded-full bg-[var(--color-terracotta)] text-white shadow-xs">
              {dish.badge}
            </span>
          )}
        </div>

        {onToggleFav && (
          <button
            onClick={e => { e.stopPropagation(); onToggleFav(dish.id); }}
            className={`p-1.5 rounded-full transition-colors ${
              isFav ? 'bg-[var(--color-terracotta)] text-white shadow-xs' : 'bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-[var(--color-terracotta)]'
            }`}
            aria-label={isFav ? 'Remove favourite' : 'Add to favourites'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      {/* Image Container with Soft Ambient Glow Disk */}
      <div className="relative h-28 sm:h-36 my-1 flex items-center justify-center bg-[var(--color-cream-dark)]/40 dark:bg-stone-900/40 rounded-xl sm:rounded-2xl p-2 transition-colors">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          decoding="async"
          className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-xs"
        />
      </div>

      {/* Title & Japanese Subtitle */}
      <div className="mt-2.5">
        <h3 className="text-[14px] sm:text-[16px] font-800 leading-snug text-[var(--color-dark)] group-hover:text-[var(--color-terracotta)] transition-colors truncate">
          {dish.name}
        </h3>
        <p className="text-[10px] sm:text-[11px] text-[var(--color-muted)] font-600 mt-0.5 flex items-center gap-1.5">
          <span>{dish.japanese ? `${dish.japanese} · ` : ''}{dish.pieces || '2 pcs'}</span>
          <span className="opacity-40">•</span>
          <span>{dish.category}</span>
        </p>
      </div>

      {/* Bottom Price & Add Action */}
      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800/60" onClick={e => e.stopPropagation()}>
        <span className="text-[15px] sm:text-[17px] font-900 text-[var(--color-terracotta)]">
          ₹{dish.price}
        </span>

        {qty > 0 ? (
          <div className="flex items-center justify-between h-7 sm:h-9 w-20 sm:w-24 rounded-full text-[12px] sm:text-[13px] font-800 bg-[var(--color-terracotta)] text-white shadow-xs overflow-hidden">
            <button onClick={handleRemove} className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-colors">
              <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <span className="w-4 text-center font-mono">{qty}</span>
            <button onClick={handleAdd} className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-colors">
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 h-7 sm:h-9 px-3 sm:px-4.5 rounded-full text-[11px] sm:text-[12px] font-700 transition-all ${
              justAdded
                ? 'bg-emerald-600 text-white shadow-xs scale-95'
                : 'bg-[var(--color-terracotta)] text-white hover:bg-[var(--color-terracotta-light)] shadow-xs'
            }`}
          >
            {justAdded ? (
              <><Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Added</>
            ) : (
              <><Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Add</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────── STANDARD GRID CARD ─────────────────────────────── */
export default function DishCard({ dish, isFav, onToggleFav, onViewDetail, showFavIcon = true }) {
  const [justAdded, setJustAdded] = useState(false);
  const { cartItems, handleAddToCart, handleRemoveOne } = useStore();
  const cartItem = cartItems.find(i => i.id === dish.id);
  const qty = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    handleAddToCart(dish);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    handleRemoveOne(dish.id);
  };

  return (
    <div
      className="dish-card group cursor-pointer flex flex-col justify-between"
      onClick={() => onViewDetail(dish)}
    >
      {/* Image Area */}
      <div
        className="relative h-36 sm:h-44 flex items-center justify-center p-3"
        style={{ background: 'var(--color-cream-dark)' }}
      >
        {/* Top-left: Veg marker */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
          <VegBadge isVeg={dish.isVeg} />
          {dish.badge && (
            <span
              className="text-[9px] sm:text-[10px] font-800 px-2 py-0.5 rounded-full text-white shadow-xs"
              style={{ background: 'var(--color-terracotta)' }}
            >
              {dish.badge}
            </span>
          )}
        </div>

        {/* Top-right: Favorite button */}
        {showFavIcon && (
          <button
            onClick={e => { e.stopPropagation(); onToggleFav(dish.id); }}
            className={`fav-btn absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full transition-all ${
              isFav ? 'bg-[var(--color-terracotta)] text-white shadow-xs' : 'bg-white/80 dark:bg-black/40 text-stone-400 hover:text-[var(--color-terracotta)]'
            }`}
            aria-label={isFav ? 'Remove favourite' : 'Add to favourites'}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
        )}

        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          decoding="async"
          className="h-24 sm:h-32 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Area */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex justify-between items-start mb-0.5">
            <h3 className="text-[13px] sm:text-[15px] font-800 leading-snug group-hover:text-[var(--color-terracotta)] transition-colors line-clamp-1" style={{ color: 'var(--color-brown)' }}>
              {dish.name}
            </h3>
            <Info className="w-3.5 h-3.5 mt-0.5 ml-1 flex-shrink-0 opacity-30 group-hover:opacity-70 transition-opacity"
              style={{ color: 'var(--color-terracotta)' }} />
          </div>

          <p className="text-[10px] sm:text-[11px] mb-1.5 font-600" style={{ color: 'var(--color-muted)' }}>
            {dish.pieces || 'Japanese Dish'} · {dish.isVeg ? '🌿 Veg' : '🐟 Non-Veg'}
          </p>

          <p className="text-[10px] sm:text-[11px] leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--color-muted)' }}>
            {dish.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800/60" onClick={e => e.stopPropagation()}>
          <span className="text-[14px] sm:text-[17px] font-900" style={{ color: 'var(--color-terracotta)' }}>
            ₹{dish.price}
          </span>
          {qty > 0 ? (
            <div className="flex items-center justify-between h-7 sm:h-9 w-20 sm:w-24 rounded-full text-[11px] sm:text-[13px] font-800 bg-[var(--color-terracotta)] text-white shadow-xs overflow-hidden">
              <button onClick={handleRemove} className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-colors">
                <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <span className="w-4 text-center font-mono">{qty}</span>
              <button onClick={handleAdd} className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-colors">
                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 h-7 sm:h-9 px-2.5 sm:px-4 rounded-full text-[10px] sm:text-[12px] font-700 transition-all ${
                justAdded
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-[var(--color-terracotta)] text-white hover:bg-[var(--color-terracotta-light)] shadow-xs'
              }`}
            >
              {justAdded ? (
                <><Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Added</>
              ) : (
                <><Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Add</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
