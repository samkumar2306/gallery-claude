import { motion } from 'framer-motion';
import { Camera, Upload } from 'lucide-react';

export default function Header({ onUploadClick }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand">
          <span className="site-header__mark">
            <Camera size={18} strokeWidth={1.75} />
          </span>
          <div className="site-header__title">
            <span className="site-header__name">Field &amp; Frame</span>
            <span className="site-header__tag">a photographic archive</span>
          </div>
        </div>

        <motion.button
          type="button"
          className="upload-btn"
          onClick={onUploadClick}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          <Upload size={16} strokeWidth={2} />
          <span>Upload photos</span>
        </motion.button>
      </div>
    </header>
  );
}
