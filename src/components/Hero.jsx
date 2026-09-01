import { Tag, ShoppingBag, Bike } from 'lucide-react';
import useInView from '../hooks/useInView';

export default function Hero() {
  const [contentRef, contentVisible] = useInView({ threshold: 0.1 });
  const [imgRef, imgVisible] = useInView({ threshold: 0.1 });
  const [stripRef, stripVisible] = useInView({ threshold: 0.1 });

  return (
    <section
      id="home"
      className="relative flex flex-col justify-start overflow-hidden pt-28 lg:pt-36 pb-16 lg:pb-24 transition-colors"
      style={{ background: 'var(--color-cream)' }}
    >
      {/* ── ULTRAWIDE / ZOOM CONSTRAINT CONTAINER ── */}
      <div className="absolute inset-0 w-full max-w-[1920px] mx-auto pointer-events-none z-0">
        {/* Background Elements */}
        {/* Light blue circle on the left */}
        <div
          className="absolute top-0 left-[-15%] 2xl:left-[-5%] w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: 'var(--color-terracotta-pale)', zIndex: 0 }}
        />

        {/* Faint peach circle on the right */}
        <div
          className="absolute top-20 right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--color-terracotta-pale) 0%, transparent 70%)', zIndex: 0 }}
        />
        
        {/* ── ABSOLUTE RIGHT VIEWPORT PINNED GRAPHICS (Zero Gap on Desktop & Tablet) ── */}
        <div className="hidden md:block absolute right-0 top-[100px] xl:top-[120px] w-[50vw] lg:w-[45vw] max-w-[750px] h-[550px] z-10">
          {/* Right Side Background Circle */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/4 w-[400px] h-[400px] lg:w-[580px] lg:h-[580px] xl:w-[680px] xl:h-[680px] bg-[var(--color-terracotta-pale)] rounded-full z-0 transition-colors" />

          {/* susususu.png — Sushi Hero Image (STAR OF THE SHOW) */}
          <img
            src="/img/susususu.png"
            alt="Premium Sushi Nigiri"
            fetchPriority="high"
            decoding="async"
            className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-[6%] w-[500px] lg:w-[700px] xl:w-[850px] max-w-none object-contain z-10 select-none animate-[spin_60s_linear_infinite]"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-14 w-full relative z-10 pt-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── LEFT EDITORIAL CONTENT ── */}
          <div ref={contentRef} data-visible={contentVisible} className="reveal-left">
            {/* Title with inline image */}
            <h1
              className="text-[44px] sm:text-[70px] md:text-[85px] leading-[1.05] font-900 tracking-tight mb-5 sm:mb-6 relative opacity-100"
              style={{ color: 'var(--color-dark)', fontFamily: 'var(--font-display)', letterSpacing: '-0.04em' }}
            >
              The Sushi
              <span className="absolute ml-[0.1em] sm:ml-[0.25em]" style={{ transform: 'translateY(-0.05em)' }}>
                <img
                  src="/img/Plate.png"
                  alt="Dish"
                  fetchPriority="high"
                  decoding="async"
                  className="w-[1.1em] h-[1.1em] max-w-none rounded-full object-cover shadow-xl bg-[var(--color-cream)] animate-[spin_40s_linear_infinite]"
                />
              </span>
              <br />
              Spot
            </h1>

            {/* Subtext */}
            <p
              className="text-[14px] md:text-[15px] leading-[1.7] max-w-[300px] mb-6 text-[var(--color-dark)] opacity-75"
              style={{ fontWeight: 500 }}
            >
              Purest Sushi Experience Focusing on Premium Quality Ingredients.
            </p>

            {/* CTA Buttons — clear visual hierarchy */}
            <div className="flex flex-wrap items-center gap-3 mb-7">
              {/* Primary CTA — significantly larger, filled terracotta */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-accent px-6 py-3 sm:px-10 sm:py-4 rounded-full text-[13px] sm:text-[15px]"
              >
                Explore Menu
              </button>
              {/* Secondary CTA — ghost, smaller, lower visual weight */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center bg-transparent text-[var(--color-dark)] px-6 py-3 sm:px-7 sm:py-4 rounded-full text-[13px] sm:text-[15px] font-medium hover:bg-[var(--color-cream-dark)] transition-colors whitespace-nowrap border border-[rgba(0,0,0,0.12)]"
              >
                Find a Table
              </button>
            </div>



          </div>

          {/* ── RIGHT FEATURE COLUMN ── */}
          <div ref={imgRef} data-visible={imgVisible} className="reveal-right hidden md:flex relative min-h-[440px] lg:min-h-[550px] items-center justify-end w-full">
            {/* Tablet/Desktop image is pinned absolutely to the viewport edge above */}
          </div>
        </div>
      </div>

      {/* ── WHY THE SUSHI SPOT? STRIP ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-14 w-full relative z-10 mt-10">

        <div className="text-center mb-10">
          <p className="section-eyebrow">Discover</p>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-900 opacity-100">Why The Sushi Spot ?</h2>
        </div>

        <div ref={stripRef} className="rounded-[40px] p-8 md:p-14 transition-colors" style={{ background: 'var(--color-cream-dark)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Feature 1 */}
            <div data-visible={stripVisible} className="reveal-up stagger-1 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5">
              <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] shrink-0 rounded-full bg-[#d6e7e1] dark:bg-[var(--color-surface)] flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/5">
                <Tag className="w-7 h-7 sm:w-8 sm:h-8 text-[#2c7a5b] dark:text-[var(--color-terracotta)]" />
              </div>
              <div>
                <h4 className="text-[15px] font-800 text-[var(--color-dark)] mb-1 sm:mb-1.5 mt-1 sm:mt-0 opacity-100">Hot Deals & Offers</h4>
                <p className="text-[13px] text-[var(--color-dark)] opacity-70 font-500 leading-relaxed max-w-[240px] mx-auto sm:mx-0">
                  We want to show you some love by giving you discounts off food in our restaurants.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div data-visible={stripVisible} className="reveal-up stagger-2 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5">
              <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] shrink-0 rounded-full bg-[#fbdcd7] dark:bg-[var(--color-surface)] flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/5 p-2">
                <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 text-[#d45b48] dark:text-[var(--color-terracotta)]" />
              </div>
              <div>
                <h4 className="text-[15px] font-800 text-[var(--color-dark)] mb-1 sm:mb-1.5 mt-1 sm:mt-0 opacity-100">Self Pick-Up</h4>
                <p className="text-[13px] text-[var(--color-dark)] opacity-70 font-500 leading-relaxed max-w-[240px] mx-auto sm:mx-0">
                  Self Pick-up is a service which allows you to place Self Pick-up orders through our App.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div data-visible={stripVisible} className="reveal-up stagger-3 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5">
              <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] shrink-0 rounded-full bg-[#e1dfdf] dark:bg-[var(--color-surface)] flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/5 p-2">
                <Bike className="w-7 h-7 sm:w-8 sm:h-8 text-[#636363] dark:text-[var(--color-terracotta)]" />
              </div>
              <div>
                <h4 className="text-[15px] font-800 text-[var(--color-dark)] mb-1 sm:mb-1.5 mt-1 sm:mt-0 opacity-100">Fastest Delivery</h4>
                <p className="text-[13px] text-[var(--color-dark)] opacity-70 font-500 leading-relaxed max-w-[240px] mx-auto sm:mx-0">
                  Choose your food and we'll deliver it as fast as we can. Download the app & enjoy.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
