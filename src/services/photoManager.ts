import { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

const STORAGE_KEY = 'sivasri_profile_photo_data';
const PHOTO_EVENT = 'sivasri-photo-updated';

export function getStoredProfilePhoto(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.trim().length > 0) {
      return saved;
    }
  } catch (e) {
    console.error('Failed to read photo from storage:', e);
  }
  return PERSONAL_INFO.photoUrl || '/sivasri_photo.png';
}

export async function saveProfilePhoto(dataUrlOrBlob: string): Promise<string> {
  try {
    // 1. Save to local storage for instant access across tabs
    localStorage.setItem(STORAGE_KEY, dataUrlOrBlob);

    // 2. Dispatch custom event so all components update immediately
    window.dispatchEvent(new CustomEvent(PHOTO_EVENT, { detail: dataUrlOrBlob }));

    // 3. Persist to Express backend server
    try {
      await fetch('/api/upload-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: dataUrlOrBlob }),
      });
    } catch (apiErr) {
      console.warn('Backend photo save warning (cached locally):', apiErr);
    }

    return dataUrlOrBlob;
  } catch (err) {
    console.error('Failed to save profile photo:', err);
    return dataUrlOrBlob;
  }
}

export function resetProfilePhoto(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    const defaultUrl = PERSONAL_INFO.photoUrl || '/sivasri_photo.png';
    window.dispatchEvent(new CustomEvent(PHOTO_EVENT, { detail: defaultUrl }));
  } catch (e) {
    console.error('Failed to reset photo:', e);
  }
}

export function useProfilePhoto() {
  const [photoUrl, setPhotoUrl] = useState<string>(() => getStoredProfilePhoto());

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setPhotoUrl(customEvent.detail);
      }
    };

    window.addEventListener(PHOTO_EVENT, handleUpdate);
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setPhotoUrl(e.newValue);
      }
    });

    return () => {
      window.removeEventListener(PHOTO_EVENT, handleUpdate);
    };
  }, []);

  return photoUrl;
}
