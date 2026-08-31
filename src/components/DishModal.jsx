import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

/* FSSAI-style veg/non-veg dot */
function VegDot({ isVeg, size = 5 }) {
  return (
    <div
      className={`w-${size} h-${size} rounded-sm inline-flex items-center justify-center flex-shrink-0`}
      style={{ border: `2px solid ${isVeg ? '#1a8c3e' : '#c0392b'}` }}
    >
      <div
        className="w-2.5 h-2.5 rounded-full"
        style={{ background: isVeg ? '#1a8c3e' : '#c0392b' }}
      />
    </div>
  );
}

export default function DishModal({ dish, onClose }) {
  const [qty, setQty] = useState(1);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { handleAddToCart } = useStore();

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!dish) return null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) handleAddToCart(dish);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-x-0 bottom-0 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 z-[301] w-full sm:max-w-lg"
        style={{ maxHeight: '92vh' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
      >
        <div
          className="rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col bg-[var(--color-surface)] transition-colors"
          style={{ maxHeight: '90vh' }}
        >
          {/* Image with skeleton */}
          <div
            className="relative h-52 sm:h-60 flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--color-cream)' }}
          >
            {/* Skeleton placeholder */}
            {!imgLoaded && (
              <div className="skeleton absolute inset-8 rounded-2xl" />
            )}
            <img
              src={dish.image} alt={dish.name}
              className={`h-44 w-auto object-contain drop-shadow-2xl transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'var(--color-cream-dark)' }}
              aria-label="Close"
            >
              <X className="w-5 h-5" style={{ color: 'var(--color-brown)' }} />
            </button>
            {dish.badge && (
              <span
                className="absolute top-4 left-4 text-[11px] font-700 px-3 py-1 rounded-full"
                style={{ background: 'var(--color-terracotta)', color: '#fff' }}
              >
                {dish.badge}
              </span>
            )}
          </div>

          {/* Content — scrollable */}
          <div className="flex flex-col overflow-y-auto px-6 pb-4 pt-5">
            {/* Name + veg */}
            <div className="flex items-start justify-between gap-3 mb-1">
              <h2 id="dish-modal-title" className="text-[20px] font-800 leading-tight" style={{ color: 'var(--color-dark)' }}>
                {dish.name}
              </h2>
              <VegDot isVeg={dish.isVeg} size={5} />
            </div>

            {/* Japanese name + pieces */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[12px]" style={{ color: 'var(--color-muted)', fontFamily: 'Noto Serif JP, serif' }}>
                {dish.japanese}
              </span>
              <span className="text-[12px]" style={{ color: 'var(--color-muted)' }}>·</span>
              <span className="text-[12px] font-600" style={{ color: 'var(--color-muted)' }}>{dish.pieces}</span>
              <span
                className="text-[11px] font-700 px-2 py-0.5 rounded-full ml-auto"
                style={{
                  background: dish.isVeg ? 'rgba(26,140,62,0.1)' : 'rgba(192,57,43,0.08)',
                  color: dish.isVeg ? '#1a8c3e' : '#c0392b',
                }}
              >
                {dish.isVeg ? '🌿 Pure Veg' : '🐟 Non-Vegetarian'}
              </span>
            </div>

            {/* Description */}
            <p className="text-[14px] leading-relaxed mb-5" style={{ color: 'var(--color-muted)' }}>
              {dish.description}
            </p>

            {/* Allergens */}
            {dish.allergens?.length > 0 && (
              <div className="mb-5">
                <p className="text-[11px] font-700 uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)' }}>
                  Contains
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {dish.allergens.map(a => (
                    <span
                      key={a}
                      className="text-[11px] font-600 px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(212,96,58,0.08)', color: 'var(--color-terracotta)' }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Add */}
            <div className="flex items-center justify-between gap-4 mt-2 sticky bottom-0 bg-[var(--color-surface)] transition-colors pt-3 pb-1">
              {/* Qty selector */}
              <div
                className="flex items-center gap-3 rounded-full px-3 py-1.5"
                style={{ border: '1.5px solid rgba(212,96,58,0.25)' }}
              >
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                  style={{ color: qty === 1 ? '#CCC' : 'var(--color-terracotta)' }}
                  aria-label="Decrease"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-[16px] font-800 w-5 text-center text-[var(--color-dark)]">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                  style={{ color: 'var(--color-terracotta)' }}
                  aria-label="Increase"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to order */}
              <button
                onClick={handleAdd}
                className="btn-accent px-8 py-3.5 rounded-full text-[15px] font-bold shadow-lg whitespace-nowrap flex-grow gap-2"
                style={{ padding: '13px 0' }}
              >
                <ShoppingCart className="w-4 h-4" />
                Add {qty > 1 ? `×${qty}` : ''} — ₹{dish.price * qty}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
