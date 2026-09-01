import { X, CheckCircle2, ChefHat, Bike, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';

export default function OrderTrackerModal({ isOpen, onClose, finalTotal }) {
  const { cartItems } = useStore();
  const [step, setStep] = useState(0);
  const [orderId, setOrderId] = useState('SS-1001');

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setOrderId(`SS-${Math.floor(1000 + Math.random() * 9000)}`);
      const t1 = setTimeout(() => setStep(1), 2000);
      const t2 = setTimeout(() => setStep(2), 5000);
      const t3 = setTimeout(() => setStep(3), 8500);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const whatsappMsg = encodeURIComponent(
    `*Order #${orderId}*\n` +
    `Status: Preparing\n\n` +
    cartItems.map(i => `• ${i.name} × ${i.quantity}`).join('\n') +
    `\n\nTotal Paid: ₹${finalTotal.toFixed(2)}`
  );

  return (
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tracker-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[var(--color-surface)] w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden anim-bounce-in">
        
        {/* Header */}
        <div className="bg-[var(--color-nori-card)] text-white px-6 py-5 text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="text-[11px] font-800 tracking-widest text-[var(--color-terracotta-light)] uppercase mb-1">
            Order Confirmed
          </p>
          <h2 id="tracker-title" className="text-2xl font-900">#{orderId}</h2>
        </div>

        {/* Tracker Steps */}
        <div className="px-8 py-8 relative">
          {/* Connecting Line */}
          <div className="absolute left-[45px] top-10 bottom-12 w-0.5 bg-stone-100 dark:bg-stone-800 z-0" />
          
          <div className="flex flex-col gap-6 relative z-10">
            {/* Step 1: Received */}
            <div className={`flex gap-4 items-center transition-all duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-40 grayscale'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${step >= 1 ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500'}`}>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[14px] font-800 text-[var(--color-dark)]">Order Received</h4>
                <p className="text-[11px] text-[var(--color-muted)] font-600">Checking kitchen capacity...</p>
              </div>
            </div>

            {/* Step 2: Preparing */}
            <div className={`flex gap-4 items-center transition-all duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-40 grayscale'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${step >= 2 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500'}`}>
                <ChefHat className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[14px] font-800 text-[var(--color-dark)]">Preparing Food</h4>
                <p className="text-[11px] text-[var(--color-muted)] font-600">Chef is rolling your sushi</p>
              </div>
            </div>

            {/* Step 3: Out for Delivery */}
            <div className={`flex gap-4 items-center transition-all duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-40 grayscale'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${step >= 3 ? 'bg-[var(--color-terracotta-pale)] text-[var(--color-terracotta)]' : 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500'}`}>
                <Bike className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[14px] font-800 text-[var(--color-dark)]">Out for Delivery</h4>
                <p className="text-[11px] text-[var(--color-muted)] font-600">Rider is on the way</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="px-6 py-5 bg-[var(--color-cream)] border-t border-[rgba(212,96,58,0.1)]">
          <a
            href={`https://wa.me/919840000000?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[var(--color-terracotta)] text-white rounded-xl text-[14px] font-800 flex items-center justify-center gap-2 hover:bg-opacity-90 transition-opacity shadow-lg shadow-[rgba(212,96,58,0.25)]"
          >
            Forward to WhatsApp <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
