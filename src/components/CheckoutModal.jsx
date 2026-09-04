import { X, CreditCard, Lock, Loader2, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import FocusLock from 'react-focus-lock';

export default function CheckoutModal({ isOpen, onClose, totalAmount, onSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setIsProcessing(false);
      setIsSuccess(false);
      setCardNumber('');
      setExpiry('');
      setCvc('');
      setName('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvc || !name) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Simulate success delay before calling onSuccess
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-md transition-all duration-300" 
        onClick={!isProcessing && !isSuccess ? onClose : undefined} 
        aria-hidden="true" 
      />
      
      <FocusLock returnFocus>
        <div 
          className="fixed inset-x-0 bottom-0 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 z-[401] w-full sm:max-w-[420px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
        >
          <div className="bg-white dark:bg-[#1A1A1A] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col p-6 relative anim-bounce-in">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 id="checkout-title" className="text-[20px] font-800 text-[var(--color-dark)] flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-600" />
                Secure Checkout
              </h2>
              {!isProcessing && !isSuccess && (
                <button 
                  onClick={onClose} 
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[var(--color-muted)]"
                  aria-label="Close checkout"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-[22px] font-800 text-[var(--color-dark)]">Payment Successful!</h3>
                <p className="text-[14px] font-600 text-[var(--color-muted)] mt-2">Redirecting to order tracker...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Total amount summary */}
                <div className="bg-[var(--color-cream-dark)] dark:bg-[#2A2A2A] p-4 rounded-xl flex items-center justify-between mb-2">
                  <span className="text-[14px] font-600 text-[var(--color-muted)]">Total Amount</span>
                  <span className="text-[24px] font-800" style={{ color: 'var(--color-terracotta)' }}>
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>

                {/* Simulated Stripe Inputs */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cardName" className="text-[12px] font-700 uppercase tracking-wider text-[var(--color-muted)]">Name on Card</label>
                    <input 
                      id="cardName"
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-[14px] font-600 outline-none focus:border-[var(--color-terracotta)] transition-colors text-[var(--color-dark)]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cardNumber" className="text-[12px] font-700 uppercase tracking-wider text-[var(--color-muted)]">Card Information</label>
                    <div className="relative">
                      <input 
                        id="cardNumber"
                        type="text" 
                        required
                        placeholder="0000 0000 0000 0000"
                        maxLength="19"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded-lg pl-10 pr-4 py-3 text-[14px] font-600 outline-none focus:border-[var(--color-terracotta)] transition-colors text-[var(--color-dark)]"
                      />
                      <CreditCard className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      required
                      placeholder="MM/YY"
                      maxLength="5"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-[14px] font-600 outline-none focus:border-[var(--color-terracotta)] transition-colors text-[var(--color-dark)]"
                    />
                    <input 
                      type="password" 
                      required
                      placeholder="CVC"
                      maxLength="3"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-[14px] font-600 outline-none focus:border-[var(--color-terracotta)] transition-colors text-[var(--color-dark)]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 mt-2">
                  <Lock className="w-3 h-3 text-gray-400" />
                  <span className="text-[11px] font-600 text-gray-400">Payments are secure and encrypted.</span>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="btn-accent w-full py-4 mt-2 rounded-xl text-[16px] font-800 flex justify-center items-center gap-2"
                >
                  {isProcessing ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                  ) : (
                    `Pay ₹${totalAmount.toFixed(2)}`
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </FocusLock>
    </>
  );
}
