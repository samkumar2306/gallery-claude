import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, UploadCloud, Check, ImageOff } from 'lucide-react';
import { useGallery } from '../hooks/useGallery.js';

function currentYear() {
  return new Date().getFullYear();
}

export default function UploadModal({ isOpen, onClose }) {
  const { years, selectedYear, addPhotos, setSelectedYear } = useGallery();
  const [pendingFiles, setPendingFiles] = useState([]); // {file, previewUrl}
  const [targetYear, setTargetYear] = useState(selectedYear || currentYear());
  const [customYear, setCustomYear] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | saving | done
  const inputRef = useRef(null);

  const yearOptions = Array.from(
    new Set([currentYear(), ...years].filter(Boolean))
  ).sort((a, b) => b - a);

  const resetState = useCallback(() => {
    pendingFiles.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPendingFiles([]);
    setStatus('idle');
    setCustomYear('');
  }, [pendingFiles]);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [resetState, onClose]);

  function addFiles(fileList) {
    const imageFiles = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    const next = imageFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 6)}`,
    }));
    setPendingFiles((prev) => [...prev, ...next]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  }

  function removePending(id) {
    setPendingFiles((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  }

  async function handleConfirm() {
    const year = customYear ? parseInt(customYear, 10) : targetYear;
    if (!year || pendingFiles.length === 0) return;
    setStatus('saving');
    await addPhotos(
      pendingFiles.map((p) => p.file),
      year
    );
    setStatus('done');
    setSelectedYear(year);
    setTimeout(() => {
      handleClose();
    }, 900);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="upload-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="upload-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Upload photos"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="upload-modal__close"
              onClick={handleClose}
              aria-label="Close upload dialog"
            >
              <X size={18} />
            </button>

            <h2 className="upload-modal__title">Add upcoming photos</h2>
            <p className="upload-modal__subtitle">
              Drop images in, pick the year they belong to, and they'll join the archive.
            </p>

            <div
              className={`upload-dropzone ${isDragging ? 'is-dragging' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
              }}
            >
              <UploadCloud size={26} strokeWidth={1.5} />
              <p>
                <strong>Click to browse</strong> or drag photos here
              </p>
              <span className="upload-dropzone__hint">JPG, PNG, or WEBP</span>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => e.target.files && addFiles(e.target.files)}
              />
            </div>

            {pendingFiles.length > 0 && (
              <div className="upload-previews">
                {pendingFiles.map((p) => (
                  <div className="upload-preview" key={p.id}>
                    <img src={p.previewUrl} alt={p.file.name} />
                    <button
                      type="button"
                      className="upload-preview__remove"
                      onClick={() => removePending(p.id)}
                      aria-label={`Remove ${p.file.name}`}
                    >
                      <X size={12} strokeWidth={2.5} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="upload-modal__year">
              <label htmlFor="year-select">Year taken</label>
              <div className="upload-modal__year-row">
                <select
                  id="year-select"
                  value={customYear ? '' : targetYear}
                  onChange={(e) => {
                    setCustomYear('');
                    setTargetYear(parseInt(e.target.value, 10));
                  }}
                >
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <span className="upload-modal__or">or new year</span>
                <input
                  type="number"
                  placeholder="e.g. 2027"
                  value={customYear}
                  min="1900"
                  max="2100"
                  onChange={(e) => setCustomYear(e.target.value)}
                  className="upload-modal__custom-year"
                />
              </div>
            </div>

            <button
              type="button"
              className="upload-modal__confirm"
              disabled={pendingFiles.length === 0 || status === 'saving'}
              onClick={handleConfirm}
            >
              {status === 'saving' && 'Saving…'}
              {status === 'done' && (
                <>
                  <Check size={16} /> Added to the archive
                </>
              )}
              {status === 'idle' &&
                (pendingFiles.length === 0 ? (
                  <>
                    <ImageOff size={16} /> Select photos first
                  </>
                ) : (
                  `Add ${pendingFiles.length} photo${pendingFiles.length === 1 ? '' : 's'}`
                ))}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
