import { Navigation } from 'lucide-react';
import useInView from '../hooks/useInView';

export default function Location() {
  const [headerRef, headerVisible] = useInView();
  const [mapRef, mapVisible] = useInView({ threshold: 0.08 });
  const [infoRef, infoVisible] = useInView({ threshold: 0.08 });
  /* Mylapore, Chennai — 47 Palm Avenue */
  const MAPS_EMBED =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0547697660853!2d80.26746037359628!3d13.031882487285716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267104faf2e57%3A0x3d4a26dda39af3d7!2sPalm%20Avenue%2C%20Mylapore%2C%20Chennai%2C%20Tamil%20Nadu%20600004!5e0!3m2!1sen!2sin!4v1693400000000!5m2!1sen!2sin';

  const infoRows = [
    {
      icon: '📍',
      label: 'Address',
      value: '47, Palm Avenue, Mylapore\nChennai, Tamil Nadu — 600 004',
    },
    {
      icon: '🕘',
      label: 'Opening Hours',
      value: 'Every day · 9:00 AM – 11:00 PM',
    },
    {
      icon: '📞',
      label: 'Phone',
      value: '+91 98400 00000',
    },
    {
      icon: '🚇',
      label: 'Nearest Metro',
      value: 'Mylapore Station · 4 min walk',
    },
  ];

  return (
    <section id="location" className="py-20 lg:py-24 bg-[var(--color-cream)] transition-colors">
      {/* Leaf decoration */}
      <img
        src="/img/leaf-branch-3.png" alt="" aria-hidden="true" loading="lazy"
        className="absolute left-0 bottom-10 w-28 opacity-20 pointer-events-none"
        style={{ transform: 'scaleX(-1)' }}
      />
      <img
        src="/img/leaf-branch-4.png" alt="" aria-hidden="true" loading="lazy"
        className="absolute right-0 top-16 w-24 opacity-15 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-5 lg:px-14">

        {/* Section header */}
        <div ref={headerRef} data-visible={headerVisible} className="reveal-up text-center mb-12">
          <p className="section-eyebrow">Visit Us</p>
          <h2
            className="text-4xl lg:text-5xl font-900 mt-2 mb-3 text-[var(--color-dark)]"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            Find Us in{' '}
            <span>Mylapore</span>
          </h2>
          <p
            className="text-[15px] max-w-md mx-auto"
            style={{ color: 'var(--color-muted)' }}
          >
            We're nestled in the heart of Chennai's most vibrant cultural neighbourhood. Come hungry, leave happy.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">

          {/* ── Map embed (3/5 width) ── */}
          <div ref={mapRef} data-visible={mapVisible} className="reveal-left lg:col-span-3 rounded-[32px] overflow-hidden shadow-sm border border-black/5 dark:border-white/10 relative group">
            <div className="absolute inset-0 bg-black/10 dark:bg-white/5 pointer-events-none z-10 transition-colors"></div>
            <div className="map-container h-[400px] lg:h-full min-h-[380px] bg-[var(--color-cream-dark)] relative flex items-center justify-center">
              {!mapVisible && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-[var(--color-terracotta)] border-t-transparent rounded-full animate-spin opacity-50" />
                </div>
              )}
              {mapVisible && (
                <iframe
                  src={MAPS_EMBED}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '380px', display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Sushi Spot location — Mylapore, Chennai"
                  className="relative z-0"
                />
              )}
            </div>
          </div>

          {/* ── Info card (2/5 width) ── */}
          <div ref={infoRef} data-visible={infoVisible} className="reveal-right stagger-2 lg:col-span-2">
            <div className="bg-[var(--color-surface)] rounded-[32px] p-8 lg:p-12 shadow-sm border border-black/5 dark:border-white/10 flex flex-col justify-center transition-colors h-full">

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-black/5 dark:bg-white/10 text-[var(--color-terracotta)]">
                    <img src="/img/logo.png" alt="" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="text-[18px] font-800" style={{ color: 'var(--color-dark)' }}>
                    The Sushi Spot
                  </span>
                </div>
                <p className="text-[12px] ml-[52px]" style={{ color: 'var(--color-muted)' }}>
                  Japanese Cuisine · Mylapore
                </p>
              </div>

              {/* Info rows */}
              <div className="flex-grow space-y-6">
                {infoRows.map(row => (
                  <div key={row.label} className="flex gap-4">
                    <div className="text-xl mt-0.5">{row.icon}</div>
                    <div>
                      <h4 className="text-[14px] font-800 text-[var(--color-dark)] mb-1">{row.label}</h4>
                      <p className="text-[13px] text-[var(--color-muted)] leading-relaxed whitespace-pre-line font-500">
                        {row.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Open in Maps CTA */}
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--color-terracotta)] text-white rounded-full text-[14px] font-bold hover:bg-[var(--color-terracotta-light)] transition-colors shadow-lg mt-8"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
