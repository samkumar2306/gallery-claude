import { AnimatePresence, motion } from 'framer-motion';
import { useGallery } from '../hooks/useGallery.js';
import PhotoCard from './PhotoCard.jsx';
import EmptyState from './EmptyState.jsx';

export default function Gallery({ onOpenLightbox, onUploadClick }) {
  const { filteredPhotos, selectedYear, isHydrated } = useGallery();

  if (!isHydrated) {
    return (
      <div className="gallery-loading" aria-live="polite">
        <span className="gallery-loading__spinner" />
        <span>Opening the archive…</span>
      </div>
    );
  }

  return (
    <section className="gallery-section" aria-label={`Photos from ${selectedYear}`}>
      <AnimatePresence mode="wait">
        {filteredPhotos.length === 0 ? (
          <motion.div
            key={`empty-${selectedYear}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EmptyState year={selectedYear} onUploadClick={onUploadClick} />
          </motion.div>
        ) : (
          <motion.div
            key={`grid-${selectedYear}`}
            className="photo-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filteredPhotos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                onOpen={() => onOpenLightbox(index)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
