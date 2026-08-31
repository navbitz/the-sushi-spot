import { Tag, ArrowRight } from 'lucide-react';

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
    <section className="py-20 lg:py-24 bg-[var(--color-cream)] transition-colors">
      <div className="max-w-6xl mx-auto px-5 lg:px-14">
        <div className="grid md:grid-cols-2 gap-6">
          {deals.map((deal, index) => (
            <div
              key={deal.id}
              className="rounded-3xl p-8 relative overflow-hidden group border border-black/5 dark:border-white/10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              style={{ background: deal.bg, color: deal.textColor }}
            >
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-800 tracking-wider mb-4 border border-current opacity-80">
                  <Tag className="w-3.5 h-3.5" />
                  {deal.tag}
                </div>
                <h3 className="text-2xl font-900 mb-2">{deal.title}</h3>
                <p className="text-[14px] opacity-80 max-w-sm mb-6 font-500 leading-relaxed">
                  {deal.desc}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10">
                <div>
                  <span className="text-[11px] uppercase tracking-wider block opacity-70">Use Code</span>
                  <span className="text-[16px] font-900 tracking-widest">{deal.code}</span>
                </div>
                <span className="text-2xl font-900 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/10">
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
