import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useGallery } from '../hooks/useGallery.js';

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default function EditPhotoModal({ photo, onClose }) {
  const { editPhoto } = useGallery();
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState(todayIso());
  const [status, setStatus] = useState('idle'); // idle | saved
  const [trackedPhotoId, setTrackedPhotoId] = useState(null);

  // Re-seed the form fields whenever a *different* photo is opened for
  // editing. Done during render (React's documented pattern for this) so
  // it doesn't trigger an extra effect-driven re-render.
  if (photo && photo.id !== trackedPhotoId) {
    setTrackedPhotoId(photo.id);
    setTitle(photo.title || '');
    setCaption(photo.caption || '');
    setDate(photo.date || todayIso());
    setStatus('idle');
  }

  const isOpen = Boolean(photo);

  function handleSave() {
    if (!photo || !date) return;
    editPhoto(photo.id, { title, caption, date });
    setStatus('saved');
    setTimeout(() => onClose(), 600);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="upload-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="upload-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Edit photo details"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="upload-modal__close"
              onClick={onClose}
              aria-label="Close edit dialog"
            >
              <X size={18} />
            </button>

            <h2 className="upload-modal__title">Edit photo</h2>
            <p className="upload-modal__subtitle">
              Change the date and it'll move to the right year automatically.
            </p>

            {photo && (
              <div className="edit-modal__preview">
                <img src={photo.src} alt={photo.title || 'Photo preview'} />
              </div>
            )}

            <div className="upload-modal__year">
              <label htmlFor="edit-date-taken">Date taken</label>
              <input
                id="edit-date-taken"
                type="date"
                value={date}
                max={todayIso()}
                onChange={(e) => setDate(e.target.value)}
                className="upload-modal__date-input"
              />
            </div>

            <div className="upload-modal__year">
              <label htmlFor="edit-title">Title</label>
              <input
                id="edit-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="upload-modal__date-input"
                placeholder="Untitled photo"
              />
            </div>

            <div className="upload-modal__year">
              <label htmlFor="edit-caption">Caption (optional)</label>
              <input
                id="edit-caption"
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="upload-modal__date-input"
                placeholder="A short note about this photo"
              />
            </div>

            <button
              type="button"
              className="upload-modal__confirm"
              disabled={!date}
              onClick={handleSave}
            >
              {status === 'saved' ? (
                <>
                  <Check size={16} /> Saved
                </>
              ) : (
                'Save changes'
              )}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
