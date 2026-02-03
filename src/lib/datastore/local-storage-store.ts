'use client';

import type { LoadData, NewLoadData } from './types';

const STORE_KEY = 'bluegistics_form_v1';

export class LocalStorageStore {
  get(): LoadData | null {
    if (typeof window === 'undefined') {
      return null;
    }
    const rawData = window.localStorage.getItem(STORE_KEY);
    if (!rawData) {
      return null;
    }
    try {
      return JSON.parse(rawData) as LoadData;
    } catch (error) {
      console.error('Failed to parse data from local storage', error);
      return null;
    }
  }

  set(data: NewLoadData): LoadData {
    if (typeof window === 'undefined') {
      // This should not happen in client-side logic, but it's a safe guard.
      throw new Error("Cannot set data, window is not defined.");
    }
    const existingData = this.get();
    const now = new Date().toISOString();
    
    const dataToSave: LoadData = {
      ...data,
      createdAt: existingData?.createdAt || now,
      updatedAt: now,
    };

    window.localStorage.setItem(STORE_KEY, JSON.stringify(dataToSave));
    return dataToSave;
  }

  delete(): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.removeItem(STORE_KEY);
  }
}
