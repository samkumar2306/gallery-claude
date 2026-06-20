import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGallery } from '../hooks/useGallery.js';

const SWIPE_DISTANCE_THRESHOLD = 80;
const SWIPE_VELOCITY_THRESHOLD = 350;

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '12%' : '-12%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? '-12%' : '12%',
    opacity: 0,
  }),
};

export default function Lightbox() {
  const { filteredPhotos, lightboxIndex, closeLightbox, showNext, showPrev } = useGallery();
  const [direction, setDirection] = useState(1);

  const isOpen = lightboxIndex !== null;
  const photo = isOpen ? filteredPhotos[lightboxIndex] : null;

  const goNext = useCallback(() => {
    setDirection(1);
    showNext();
  }, [showNext]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    showPrev();
  }, [showPrev]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, closeLightbox, goNext, goPrev]);

  // Lock background scroll while open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  if (!photo) return null;

  function handleDragEnd(_, info) {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_DISTANCE_THRESHOLD || velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
      goNext();
    } else if (offset.x > SWIPE_DISTANCE_THRESHOLD || velocity.x > SWIPE_VELOCITY_THRESHOLD) {
      goPrev();
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={photo.title || 'Photo viewer'}
        >
          <button
            type="button"
            className="lightbox__close"
            onClick={closeLightbox}
            aria-label="Close full screen view"
          >
            <X size={22} strokeWidth={2} />
          </button>

          <div className="lightbox__counter">
            {lightboxIndex + 1} / {filteredPhotos.length}
          </div>

          {filteredPhotos.length > 1 && (
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              onClick={goPrev}
              aria-label="Previous photo"
            >
              <ChevronLeft size={26} strokeWidth={2} />
            </button>
          )}

          <div className="lightbox__stage">
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <motion.div
                key={photo.id}
                className="lightbox__slide"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
              >
                <motion.img
                  layoutId={`photo-frame-${photo.id}`}
                  src={photo.src}
                  alt={photo.title || 'Untitled photo'}
                  className="lightbox__img"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {filteredPhotos.length > 1 && (
            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              onClick={goNext}
              aria-label="Next photo"
            >
              <ChevronRight size={26} strokeWidth={2} />
            </button>
          )}

          <div className="lightbox__caption">
            <span className="lightbox__title">{photo.title}</span>
            {photo.caption && <span className="lightbox__desc">{photo.caption}</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
