import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

export default function PhotoCard({ photo, index, onOpen }) {
  return (
    <motion.figure
      className="photo-card"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      whileHover="hover"
    >
      <motion.button
        type="button"
        className="photo-card__btn"
        onClick={() => onOpen(index)}
        aria-label={`Open ${photo.title || 'photo'} full screen`}
      >
        <motion.div
          className="photo-card__frame"
          layoutId={`photo-frame-${photo.id}`}
        >
          <motion.img
            src={photo.src}
            alt={photo.title || 'Untitled photo'}
            loading="lazy"
            className="photo-card__img"
            variants={{ hover: { scale: 1.06 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="photo-card__sheen" />
        </motion.div>

        <motion.div
          className="photo-card__caption"
          variants={{
            hover: { opacity: 1, y: 0 },
          }}
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
        >
          <span className="photo-card__title">{photo.title}</span>
          {photo.date && <span className="photo-card__date">{formatDate(photo.date)}</span>}
        </motion.div>
      </motion.button>
    </motion.figure>
  );
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}
