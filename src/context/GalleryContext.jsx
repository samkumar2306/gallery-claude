import { useCallback, useEffect, useMemo, useState } from 'react';
import samplePhotos from '../data/samplePhotos.js';
import { loadUploadedPhotos, saveUploadedPhotos, fileToDataUrl } from '../utils/photoStorage.js';
import { GalleryContext } from './galleryContextDef.js';

function currentYear() {
  return new Date().getFullYear();
}

export function GalleryProvider({ children }) {
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [manualSelectedYear, setManualSelectedYear] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null); // index within filteredPhotos, or null

  // Hydrate uploaded photos from IndexedDB on mount.
  useEffect(() => {
    let cancelled = false;
    loadUploadedPhotos().then((stored) => {
      if (!cancelled) {
        setUploadedPhotos(stored);
        setIsHydrated(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const allPhotos = useMemo(() => {
    const merged = [...uploadedPhotos, ...samplePhotos];
    return merged.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [uploadedPhotos]);

  const years = useMemo(() => {
    const set = new Set(allPhotos.map((p) => p.year));
    set.add(currentYear());
    return Array.from(set).sort((a, b) => b - a);
  }, [allPhotos]);

  // Default to the most recent year that actually has photos, unless the
  // person has explicitly picked one — derived during render, no effect needed.
  const defaultYear = useMemo(() => {
    const withPhotos = years.find((y) => allPhotos.some((p) => p.year === y));
    return withPhotos ?? years[0];
  }, [years, allPhotos]);

  const selectedYear =
    manualSelectedYear !== null && years.includes(manualSelectedYear)
      ? manualSelectedYear
      : defaultYear;

  const filteredPhotos = useMemo(
    () => allPhotos.filter((p) => p.year === selectedYear),
    [allPhotos, selectedYear]
  );

  const yearCounts = useMemo(() => {
    const counts = {};
    allPhotos.forEach((p) => {
      counts[p.year] = (counts[p.year] || 0) + 1;
    });
    return counts;
  }, [allPhotos]);

  const addPhotos = useCallback(async (files, year) => {
    const fileArray = Array.from(files);
    const newPhotos = await Promise.all(
      fileArray.map(async (file, i) => {
        const dataUrl = await fileToDataUrl(file);
        return {
          id: `upload-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 8)}`,
          year,
          src: dataUrl,
          title: file.name.replace(/\.[^/.]+$/, ''),
          caption: '',
          date: `${year}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(
            new Date().getDate()
          ).padStart(2, '0')}`,
          isSample: false,
          uploadedAt: Date.now(),
        };
      })
    );

    setUploadedPhotos((prev) => {
      const next = [...newPhotos, ...prev];
      saveUploadedPhotos(next);
      return next;
    });

    return newPhotos;
  }, []);

  const removePhoto = useCallback((id) => {
    setUploadedPhotos((prev) => {
      const next = prev.filter((p) => p.id !== id);
      saveUploadedPhotos(next);
      return next;
    });
  }, []);

  const openLightboxAt = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filteredPhotos.length));
  }, [filteredPhotos.length]);
  const showPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  }, [filteredPhotos.length]);

  const value = {
    isHydrated,
    allPhotos,
    years,
    yearCounts,
    selectedYear,
    setSelectedYear: setManualSelectedYear,
    filteredPhotos,
    addPhotos,
    removePhoto,
    lightboxIndex,
    openLightboxAt,
    closeLightbox,
    showNext,
    showPrev,
  };

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
}
