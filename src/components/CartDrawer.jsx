import { X, Trash2, ArrowRight, Tag, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../context/StoreContext';

import FocusLock from 'react-focus-lock';

export default function CartDrawer({ isOpen, onClose, onCheckout }) {
  const { cartItems, handleRemoveItem, clearCart } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0); // percent (e.g., 10 for 10%)
  const [promoError, setPromoError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'MYLAPORE10') {
      setDiscount(10);
      setPromoError('');
    } else {
      setDiscount(0);
      setPromoError('Invalid or expired promo code');
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onCheckout(finalTotal, cartItems);
    }, 800);
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} aria-hidden="true" />
      <FocusLock disabled={!isOpen} className={`cart-drawer ${isOpen ? 'open' : ''}`} returnFocus>
      <div role="dialog" aria-modal="true" aria-label="Your order" className="h-full flex flex-col">

        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid var(--color-cream-dark)' }}
        >
          <div>
            <h2 className="text-[18px] font-800" style={{ color: 'var(--color-brown)' }}>Your Order</h2>
            <p className="text-[12px] font-600" style={{ color: 'var(--color-muted)' }}>
              {cartItems.length === 0 ? 'Nothing yet' : `${cartItems.reduce((a, i) => a + i.quantity, 0)} items`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[12px] font-bold text-red-500 hover:underline"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-colors"
              style={{ background: 'var(--color-cream)', color: 'var(--color-muted)' }}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-grow overflow-y-auto px-6 py-4 sm:py-5 space-y-3.5 sm:space-y-5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <img
                src="/img/popular-onigiri.webp"
                alt="Empty cart"
                className="w-24 h-24 object-contain opacity-30 mb-4"
              />
              <p className="text-[15px] font-600 mb-3" style={{ color: 'var(--color-muted)' }}>
                Your cart is empty
              </p>
              <button
                onClick={onClose}
                className="text-[13px] font-700 underline underline-offset-4"
                style={{ color: 'var(--color-terracotta)' }}
              >
                Browse the menu
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div
                key={item.id}
                className="flex gap-4 pb-3.5 sm:pb-5"
                style={{ borderBottom: '1px solid var(--color-cream-dark)' }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 bg-[var(--color-cream-dark)] rounded-xl flex items-center justify-center overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-8 sm:w-12 h-auto object-contain" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h4 className="text-[14px] font-700 leading-snug" style={{ color: 'var(--color-brown)' }}>
                      {item.name}
                    </h4>
                    <span className="text-[14px] font-800 ml-2 shrink-0" style={{ color: 'var(--color-terracotta)' }}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[12px] font-500 mt-0.5 mb-2" style={{ color: 'var(--color-muted)' }}>
                    Qty: {item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="flex items-center gap-1 text-[11px] font-600 transition-colors"
                    style={{ color: '#E07575' }}
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer (Promo + Checkout) */}
        {cartItems.length > 0 && (
          <div
            className="px-6 py-5 flex flex-col gap-4"
            style={{ borderTop: '1px solid var(--color-cream-dark)', background: 'var(--color-cream)' }}
          >
            {/* Direct Order Perks Banner */}
            <div className="px-3 py-2 rounded-lg bg-[rgba(212,96,58,0.08)] border border-[rgba(212,96,58,0.15)] text-[11px] text-[var(--color-terracotta)] font-700 flex items-center gap-2">
              <span>🎉 Direct Order Special: Use <strong>MYLAPORE10</strong> for 10% OFF</span>
            </div>

            {/* Promo Code System */}
            <div>
              <div className="flex gap-3">
                <div className="relative flex-grow">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. MYLAPORE10)"
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border outline-none transition-colors"
                    style={{
                      background: 'var(--color-surface)',
                      borderColor: 'rgba(212,96,58,0.2)',
                      color: 'var(--color-dark)'
                    }}
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2.5 text-[12px] font-bold rounded-lg text-white transition-opacity hover:opacity-90"
                  style={{ background: 'var(--color-nori-card)' }}
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-[11px] text-red-500 font-bold mt-1.5 ml-1">{promoError}</p>}
              {discount > 0 && <p className="text-[11px] text-green-600 font-bold mt-1.5 ml-1">✓ {discount}% discount applied!</p>}
            </div>

            {/* Totals */}
            <div className="flex flex-col gap-1 mt-1">
              {discount > 0 && (
                <div className="flex items-center justify-between text-[13px]" style={{ color: 'var(--color-muted)' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex items-center justify-between text-[13px] text-green-600 font-bold">
                  <span>Discount ({discount}%)</span>
                  <span>- ₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between mt-2">
                <span className="text-[14px] font-800" style={{ color: 'var(--color-brown)' }}>Final Total</span>
                <span className="text-2xl font-900" style={{ color: 'var(--color-terracotta)' }}>
                  ₹{finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="btn-accent w-full justify-center mt-2 disabled:opacity-70 flex items-center gap-2 px-6 py-4 rounded-full text-[14px]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  Secure Checkout <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-center text-[11px]" style={{ color: 'var(--color-muted)' }}>
              Taxes & delivery calculated at checkout
            </p>
          </div>
        )}
      </div>
      </FocusLock>
    </>
  );
}
