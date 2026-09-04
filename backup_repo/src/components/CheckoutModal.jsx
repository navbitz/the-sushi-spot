import { X, Lock, CreditCard, Apple, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function CheckoutModal({ isOpen, onClose, finalTotal, onSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (!isOpen) return null;

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={!isProcessing ? onClose : undefined} />
      
      <div className="relative bg-white dark:bg-stone-900 w-full max-w-md rounded-[24px] shadow-2xl overflow-hidden anim-bounce-in">
        {/* Header */}
        <div className="bg-stone-50 dark:bg-stone-950/50 px-6 py-5 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center">
          <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200">
            <Lock className="w-4 h-4 text-emerald-600" />
            <h2 id="checkout-title" className="text-[16px] font-800 tracking-tight">Secure Checkout</h2>
          </div>
          <button onClick={onClose} disabled={isProcessing} className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors disabled:opacity-50" aria-label="Close">
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 text-center">
            <p className="text-[12px] font-600 text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">Total to Pay</p>
            <p className="text-3xl font-900 font-mono text-stone-800 dark:text-stone-100">₹{finalTotal.toFixed(2)}</p>
          </div>

          <div className="flex gap-3 mb-6">
            <button 
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`flex-1 flex flex-col items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'border-stone-200 dark:border-stone-700 text-stone-500'}`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-[12px] font-700">Card</span>
            </button>
            <button 
              type="button"
              onClick={() => setPaymentMethod('upi')}
              className={`flex-1 flex flex-col items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${paymentMethod === 'upi' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'border-stone-200 dark:border-stone-700 text-stone-500'}`}
            >
              <Apple className="w-5 h-5" />
              <span className="text-[12px] font-700">UPI / Pay</span>
            </button>
          </div>

          <form onSubmit={handlePay} className="flex flex-col gap-4">
            {paymentMethod === 'card' ? (
              <>
                <div>
                  <label className="block text-[11px] font-700 text-stone-500 mb-1.5 uppercase tracking-wider">Cardholder Name</label>
                  <input type="text" required placeholder="John Doe" className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-[14px] outline-none focus:border-indigo-500 transition-colors text-stone-800 dark:text-stone-200" />
                </div>
                <div>
                  <label className="block text-[11px] font-700 text-stone-500 mb-1.5 uppercase tracking-wider">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input type="text" required placeholder="0000 0000 0000 0000" maxLength="19" className="w-full pl-11 pr-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-[14px] font-mono outline-none focus:border-indigo-500 transition-colors text-stone-800 dark:text-stone-200" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-700 text-stone-500 mb-1.5 uppercase tracking-wider">Expiry</label>
                    <input type="text" required placeholder="MM/YY" maxLength="5" className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-[14px] font-mono outline-none focus:border-indigo-500 transition-colors text-stone-800 dark:text-stone-200" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-700 text-stone-500 mb-1.5 uppercase tracking-wider">CVC</label>
                    <input type="password" required placeholder="•••" maxLength="4" className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-[14px] font-mono outline-none focus:border-indigo-500 transition-colors text-stone-800 dark:text-stone-200" />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-6 bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700">
                <p className="text-[13px] font-600 text-stone-500 dark:text-stone-400 mb-4">Scan QR or enter UPI ID on your app</p>
                <div className="w-32 h-32 mx-auto bg-stone-200 dark:bg-stone-700 rounded-lg flex items-center justify-center">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">MOCK QR</span>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isProcessing}
              className={`w-full mt-4 flex items-center justify-center gap-2 py-4 rounded-xl text-[14px] font-800 text-white transition-all shadow-lg ${paymentMethod === 'card' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20' : 'bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta-light)] shadow-orange-500/20'} disabled:opacity-70 active:scale-[0.98]`}
            >
              {isProcessing ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              ) : (
                <><Lock className="w-4 h-4" /> Pay ₹{finalTotal.toFixed(2)}</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
