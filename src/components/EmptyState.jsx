import { motion } from 'framer-motion';
import { ImagePlus } from 'lucide-react';

export default function EmptyState({ year, onUploadClick }) {
  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="empty-state__icon">
        <ImagePlus size={28} strokeWidth={1.5} />
      </div>
      <h3 className="empty-state__title">Nothing from {year} yet</h3>
      <p className="empty-state__copy">
        This year is still an empty roll. Add the first photo and it'll appear right here.
      </p>
      <button type="button" className="empty-state__btn" onClick={onUploadClick}>
        Upload to {year}
      </button>
    </motion.div>
  );
}
