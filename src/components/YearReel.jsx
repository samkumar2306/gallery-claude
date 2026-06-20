import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGallery } from '../hooks/useGallery.js';

export default function YearReel() {
  const { years, yearCounts, selectedYear, setSelectedYear } = useGallery();
  const trackRef = useRef(null);
  const itemRefs = useRef({});

  // Keep the active year centred/in-view when it changes (incl. on first load).
  useEffect(() => {
    const el = itemRefs.current[selectedYear];
    if (el && trackRef.current) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [selectedYear]);

  return (
    <nav className="year-reel" aria-label="Filter photos by year">
      <div className="year-reel__sprockets" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} className="year-reel__hole" />
        ))}
      </div>

      <div className="year-reel__track" ref={trackRef} role="tablist">
        {years.map((year) => {
          const isActive = year === selectedYear;
          const count = yearCounts[year] || 0;
          return (
            <button
              key={year}
              ref={(el) => (itemRefs.current[year] = el)}
              role="tab"
              aria-selected={isActive}
              className={`year-reel__item ${isActive ? 'is-active' : ''} ${
                count === 0 ? 'is-empty' : ''
              }`}
              onClick={() => setSelectedYear(year)}
            >
              <span className="year-reel__num">{year}</span>
              <span className="year-reel__meta">
                {count > 0 ? `${count} photo${count === 1 ? '' : 's'}` : 'no photos yet'}
              </span>
              {isActive && (
                <motion.span
                  layoutId="year-reel-glow"
                  className="year-reel__glow"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="year-reel__sprockets" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} className="year-reel__hole" />
        ))}
      </div>
    </nav>
  );
}
