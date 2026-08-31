import { useState } from 'react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--color-cream-dark)] border-t border-black/5 dark:border-white/5 transition-colors">

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-5 lg:px-14 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="md:col-span-1 lg:col-span-2 pr-0 lg:pr-10">
            <div className="flex items-center gap-2 mb-4">
              <img src="/img/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
              <span className="text-[15px] font-700 text-[var(--color-dark)]">
                The Sushi Spot
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-[var(--color-muted)]">
              Food for the body is not enough. There must be food for the soul.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[13px] font-800 uppercase tracking-widest mb-5 text-[var(--color-dark)]">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', link: 'home' },
                { name: 'Menu', link: 'menu' },
                { name: 'Location', link: 'location' }
              ].map(item => (
                <li key={item.name}>
                  <button
                    onClick={(e) => handleScrollTo(e, item.link)}
                    className="text-[13px] font-600 transition-colors text-[var(--color-muted)] hover:text-[var(--color-terracotta)]"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-[13px] font-800 uppercase tracking-widest mb-4 text-[var(--color-dark)]">
              Newsletter
            </h4>
            <p className="text-[12px] mb-3 text-[var(--color-muted)]">
              Subscribe for weekly chef specials & secret promo codes.
            </p>
            <form 
              onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                placeholder={subscribed ? "Thanks for joining!" : "Enter email..."}
                disabled={subscribed}
                className="w-full px-3 py-2 text-xs rounded-[12px] border outline-none bg-white/5 border-black/10 dark:border-white/10 text-[var(--color-dark)] disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={subscribed}
                className="px-4 py-2 text-xs font-bold bg-[var(--color-dark)] text-white rounded-[12px] hover:opacity-90 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribed ? 'Joined' : 'Join'}
              </button>
            </form>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-[13px] font-800 uppercase tracking-widest mb-5 text-[var(--color-dark)]">
              Legal
            </h4>
            <p className="text-[13px] leading-relaxed mb-3 text-[var(--color-muted)]">
              47, Palm Avenue<br />
              Mylapore<br />
              Chennai, Tamil Nadu<br />
              Pin Code: 600004
            </p>
            <p className="text-[12px] font-600 text-[var(--color-muted)]">9AM – 11PM</p>
          </div>

        </div>
      </div>

      {/* Bottom strip */}
      <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 px-5 lg:px-14 max-w-6xl mx-auto border-t border-black/5 dark:border-white/5 transition-colors">
        <p className="text-[12px] font-600 text-[var(--color-muted)]">
          © {new Date().getFullYear()} The Sushi Spot. All rights reserved.
        </p>

        {/* Payment icons (footer-card images) */}
        <div className="flex items-center gap-3">
          {[1, 2, 3, 4].map(n => (
            <img
              key={n}
              src={`/img/footer-card-${n}.png`}
              alt={`Payment method ${n}`}
              className="h-6 object-contain"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
