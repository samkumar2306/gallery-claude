import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header.jsx';
import YearReel from './components/YearReel.jsx';
import Gallery from './components/Gallery.jsx';
import Lightbox from './components/Lightbox.jsx';
import UploadModal from './components/UploadModal.jsx';
import { useGallery } from './hooks/useGallery.js';

export default function App() {
  const [isUploadOpen, setUploadOpen] = useState(false);
  const { selectedYear, openLightboxAt } = useGallery();

  return (
    <>
      <Header onUploadClick={() => setUploadOpen(true)} />

      <main className="page">
        <section className="hero">
          <motion.span
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            the archive
          </motion.span>
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Every year,
            <br />
            one roll of light.
          </motion.h1>
          <motion.p
            className="hero__copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            Pick a year on the reel below to step through the frames taken
            during it — and drop in new ones the moment they're ready.
          </motion.p>
        </section>

        <YearReel />

        <div className="gallery-heading">
          <h2>{selectedYear}</h2>
          <span className="gallery-heading__rule" />
        </div>

        <Gallery onOpenLightbox={openLightboxAt} onUploadClick={() => setUploadOpen(true)} />
      </main>

      <footer className="site-footer">
        <span>Field &amp; Frame — a photographic archive</span>
        <span className="site-footer__dot">·</span>
        <span>Swipe or use ← → inside a photo</span>
      </footer>

      <Lightbox />
      <UploadModal isOpen={isUploadOpen} onClose={() => setUploadOpen(false)} />
    </>
  );
}
