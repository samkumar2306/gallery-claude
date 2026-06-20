import { useContext } from 'react';
import { GalleryContext } from '../context/galleryContextDef.js';

export function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error('useGallery must be used within a GalleryProvider');
  return ctx;
}
