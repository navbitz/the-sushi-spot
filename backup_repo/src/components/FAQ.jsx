import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import useInView from '../hooks/useInView';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [headerRef, headerVisible] = useInView();
  const [listRef, listVisible] = useInView({ threshold: 0.05 });

  const faqs = [
    {
      q: 'Are your sushi items FSSAI certified and safe?',
      a: 'Yes, 100%! We strictly follow FSSAI hygiene standards. Our Atlantic Salmon is air-flown daily under strict cold-chain refrigeration.',
    },
    {
      q: 'Do you offer vegetarian and Jain options?',
      a: 'Absolutely. We feature a dedicated Pure Veg menu with green FSSAI (🟢) dots, including Avocado Maki, Cucumber Rolls, and Edamame Starters.',
    },
    {
      q: 'How does table reservation work?',
      a: 'Simply click "Book a Table" in our header or hero section. Select your date, time slot, and guest count to receive an instant Booking Pass receipt.',
    },
    {
      q: 'Can I order directly to avoid Swiggy/Zomato fees?',
      a: 'Yes! Placing a direct order via our website cart unlocks exclusive deals like 10% OFF using promo code MYLAPORE10 with live order tracking.',
    },
  ];

  return (
    <section className="py-12 lg:py-24 bg-[var(--color-cream)] border-t border-black/5 dark:border-white/5 transition-colors">
      <div className="max-w-3xl mx-auto px-5 lg:px-14">
        <div ref={headerRef} data-visible={headerVisible} className="reveal-up text-center mb-6 sm:mb-10">
          <p className="section-eyebrow">Got Questions?</p>
          <h2 className="text-3xl md:text-4xl font-900 mt-2 text-[var(--color-dark)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div ref={listRef} className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const stagger = ['stagger-1','stagger-2','stagger-3','stagger-4'][idx] || '';
            return (
              <div
                key={idx}
                data-visible={listVisible}
                className={`reveal-up ${stagger} bg-[var(--color-surface)] rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden shadow-sm`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className={`w-full text-left py-6 px-6 flex justify-between items-center transition-colors ${
                    isOpen ? 'bg-[var(--color-surface)] shadow-md rounded-t-2xl border-b border-[var(--color-terracotta)]' : 'bg-transparent border-b border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl'
                  }`}
                >
                  <span className={`text-[15px] font-800 transition-colors pr-8 ${isOpen ? 'text-[var(--color-terracotta)]' : 'text-[var(--color-dark)]'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--color-terracotta)]' : 'text-[var(--color-muted)]'}`}
                  />
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? '200px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  <div className="px-6 py-4 text-[14px] text-[var(--color-muted)] font-500 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
