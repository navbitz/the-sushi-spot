import { Star, Quote } from 'lucide-react';
import useInView from '../hooks/useInView';

const staggerClass = ['stagger-1', 'stagger-2', 'stagger-3'];

export default function Reviews() {
  const [headerRef, headerVisible] = useInView();
  const [gridRef, gridVisible] = useInView({ threshold: 0.08 });

  const reviews = [
    {
      id: 1,
      name: 'Ananya Ramachandran',
      role: 'Food Critic, Chennai Times',
      text: 'Hands down the freshest Salmon Sashimi in Mylapore. The rice seasoning is perfectly balanced. Highly recommended for authentic Japanese lovers!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Karthik Sundaram',
      role: 'Regular Diner',
      text: 'The direct delivery was surprisingly fast—arrived in 25 mins in eco-friendly packaging. The Dragon Maki roll is to die for!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Dr. Priya Venkat',
      role: 'Mylapore Local',
      text: 'Love that they have clear FSSAI Veg (🟢) markers for vegetarian sushi. The Avocado Hand Roll is so crisp and fresh.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section id="reviews" className="py-12 lg:py-24 bg-[var(--color-cream-dark)] transition-colors relative overflow-hidden">
      {/* ── Ambient Background Elements ── */}
      <div className="absolute top-10 left-[-10%] w-[300px] h-[300px] rounded-full pointer-events-none opacity-60 z-0" style={{ background: 'radial-gradient(circle, var(--color-terracotta-pale) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-50 z-0" style={{ background: 'radial-gradient(circle, var(--color-terracotta-pale) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-5 lg:px-14 relative z-10">
        <div ref={headerRef} data-visible={headerVisible} className="reveal-up text-center mb-8 sm:mb-14">
          <p className="section-eyebrow">Diner Experiences</p>
          <h2 className="text-3xl md:text-4xl font-900 mt-2 text-[var(--color-dark)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            Loved by Chennai Foodies
          </h2>
        </div>

        <div ref={gridRef} className="flex overflow-x-auto md:overflow-visible snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 pb-6 md:pb-6 -mx-5 px-5 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {reviews.map((rev, index) => (
            <div
              key={rev.id}
              data-visible={gridVisible}
              className={`w-[280px] sm:w-auto shrink-0 snap-center reveal-up ${staggerClass[index]} bg-[var(--color-surface)] rounded-3xl p-6 md:p-8 relative shadow-sm border border-black/5 dark:border-white/10 hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300 flex flex-col justify-between ${index === 2 ? 'md:col-span-2 lg:col-span-1 md:w-[calc(50%-16px)] md:mx-auto lg:w-full lg:mx-0' : ''}`}
            >
              <Quote className="absolute top-6 right-6 md:top-8 md:right-8 w-8 h-8 md:w-10 md:h-10 text-[var(--color-terracotta)] opacity-10" />

              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[var(--color-terracotta)] text-[var(--color-terracotta)]" />
                  ))}
                </div>
                <p className="text-[13px] md:text-[14px] leading-relaxed mb-6 font-500 text-[var(--color-muted)] relative z-10 min-h-[70px] md:min-h-[80px]">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[rgba(0,0,0,0.05)] mt-auto">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  loading="lazy"
                  className="w-11 h-11 rounded-full object-cover border-2 border-transparent shadow-sm"
                />
                <div>
                  <h4 className="text-[14px] font-800 text-[var(--color-dark)]">{rev.name}</h4>
                  <p className="text-[11px] font-600 uppercase tracking-wider text-[var(--color-terracotta)]">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
