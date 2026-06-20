// Persists uploaded photos in the browser via IndexedDB (through idb-keyval).
// Images are stored as base64 data URLs alongside their metadata so the
// gallery survives a refresh without needing a backend server.

import { get, set, del } from 'idb-keyval';

const STORE_KEY = 'gallery:uploaded-photos';

export async function loadUploadedPhotos() {
  try {
    const stored = await get(STORE_KEY);
    return Array.isArray(stored) ? stored : [];
  } catch (err) {
    console.error('Failed to load uploaded photos', err);
    return [];
  }
}

export async function saveUploadedPhotos(photos) {
  try {
    await set(STORE_KEY, photos);
  } catch (err) {
    console.error('Failed to save uploaded photos', err);
  }
}

export async function clearUploadedPhotos() {
  try {
    await del(STORE_KEY);
  } catch (err) {
    console.error('Failed to clear uploaded photos', err);
  }
}

// Reads a File object and resolves to a base64 data URL.
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}
