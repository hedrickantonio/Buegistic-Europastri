import { LocalStorageStore } from './local-storage-store';

// This is the data store abstraction layer.
// You can swap out the implementation (e.g., to Firestore) by changing this file.
// For now, we use local storage.

// import { FirestoreStore } from './firestore-store';
// export const dataStore = new FirestoreStore();

export const dataStore = new LocalStorageStore();
