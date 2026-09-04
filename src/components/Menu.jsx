import { PopularCard } from './DishCard';
import { ChefHat } from 'lucide-react';
import { menuItems } from '../data/mockData';
import { useStore } from '../context/StoreContext';
import useInView from '../hooks/useInView';

const stagger = ['stagger-1', 'stagger-2', 'stagger-3'];

export default function Menu({ onViewDetail, onOpenFullMenu }) {
  const { favourites, handleAddToCart, handleToggleFav } = useStore();
  const [headerRef, headerVisible] = useInView();
  const [gridRef, gridVisible] = useInView({ threshold: 0.08 });
  const [ctaRef, ctaVisible] = useInView();

  const popularItems = menuItems.filter(i => i.isChefsPick || i.badge);

  return (
    <>
      {/* ─── POPULAR DISHES ─────────────────────────────────────── */}
      <section
        id="menu"
        className="py-12 lg:py-24 relative overflow-hidden transition-colors"
        style={{ background: 'var(--color-cream)' }}
      >
        {/* ── Ambient Background Elements ── */}
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 z-0" style={{ background: 'radial-gradient(circle, var(--color-terracotta-pale) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] rounded-full pointer-events-none opacity-40 z-0" style={{ background: 'radial-gradient(circle, var(--color-terracotta-pale) 0%, transparent 70%)' }} />
        
        {/* Subtle Watermark Icons */}
        <ChefHat className="absolute top-[20%] right-[10%] w-48 h-48 text-[var(--color-terracotta)] opacity-[0.03] pointer-events-none rotate-12 z-0 hidden lg:block" />

        <img src="/img/leaf-branch-4.webp" alt="" aria-hidden="true"
          className="absolute left-0 top-16 w-24 opacity-[0.12] pointer-events-none z-0" />

        <div className="max-w-6xl mx-auto px-5 lg:px-14 relative z-10">
          <div ref={headerRef} data-visible={headerVisible} className="reveal-up text-center mb-8 sm:mb-16">
            <p className="section-eyebrow">The Best Food</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-900 mt-2" style={{ color: 'var(--color-dark)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              Popular Dishes
            </h2>
          </div>

          <div ref={gridRef} className="flex overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 pb-8 pt-12 sm:pb-8 sm:pt-12 -mx-5 px-5 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {popularItems.slice(0, 3).map((item, idx) => (
              <div key={item.id} data-visible={gridVisible} className={`reveal-scale shrink-0 w-[220px] sm:w-auto snap-center ${stagger[idx]} ${idx === 2 ? 'sm:col-span-2 lg:col-span-1 sm:w-[calc(50%-16px)] sm:mx-auto lg:w-full lg:mx-0' : ''}`}>
                <PopularCard
                  dish={item}
                  onAddToCart={handleAddToCart}
                  isFav={favourites.includes(item.id)}
                  onToggleFav={handleToggleFav}
                  onViewDetail={onViewDetail}
                />
              </div>
            ))}
          </div>

          {/* Explore Full Menu button */}
          <div ref={ctaRef} data-visible={ctaVisible} className="reveal-up stagger-2 text-center mt-12">
            <button
              onClick={() => onOpenFullMenu('All')}
              className="btn-primary"
              style={{ padding: '14px 36px', fontSize: '15px' }}
            >
              Explore Full Menu
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
