import { Tag } from 'lucide-react';

export default function Offers() {
  const deals = [
    {
      id: 1,
      tag: 'WEEKEND SPECIAL',
      title: 'Mylapore Party Platter',
      desc: '24-piece assorted Nigiri & Maki rolls with free edamame.',
      discount: '15% OFF',
      code: 'PARTY15',
      bg: 'var(--color-surface)',
      textColor: 'var(--color-dark)',
      accent: 'var(--color-terracotta)',
    },
    {
      id: 2,
      tag: 'DIRECT ORDER PERK',
      title: 'First Time Diner Deal',
      desc: 'Get 10% instant discount on all direct website orders.',
      discount: '10% OFF',
      code: 'MYLAPORE10',
      bg: 'var(--color-cream-dark)',
      textColor: 'var(--color-dark)',
      accent: 'var(--color-terracotta)',
    },
  ];

  return (
    <section className="py-12 lg:py-24 bg-[var(--color-cream)] transition-colors">
      <div className="max-w-6xl mx-auto px-5 lg:px-14">
        <div className="flex overflow-x-auto md:overflow-visible snap-x snap-mandatory md:grid md:grid-cols-2 gap-4 md:gap-6 pb-6 md:pb-6 -mx-5 px-5 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="w-[280px] sm:w-auto shrink-0 snap-center rounded-3xl p-6 md:p-8 relative overflow-hidden group border border-black/5 dark:border-white/10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between"
              style={{ background: deal.bg, color: deal.textColor }}
            >
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-800 tracking-wider mb-4 border border-current opacity-80">
                  <Tag className="w-3.5 h-3.5" />
                  {deal.tag}
                </div>
                <h3 className="text-xl md:text-2xl font-900 mb-2 leading-tight">{deal.title}</h3>
                <p className="text-[13px] md:text-[14px] opacity-80 max-w-sm mb-6 font-500 leading-relaxed line-clamp-2 md:line-clamp-none">
                  {deal.desc}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-4 mt-auto border-t border-black/10 dark:border-white/10">
                <div>
                  <span className="text-[10px] md:text-[11px] uppercase tracking-wider block opacity-70">Use Code</span>
                  <span className="text-[14px] md:text-[16px] font-900 tracking-widest">{deal.code}</span>
                </div>
                <span className="text-xl md:text-2xl font-900 px-3 md:px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/10">
                  {deal.discount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
