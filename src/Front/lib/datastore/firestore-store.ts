// import { collection, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase'; // Assuming firebase is initialized in this file
// import type { LoadData, NewLoadData } from './types';

// const COLLECTION_NAME = 'loads';

// export class FirestoreStore {
//   async get(userId: string): Promise<LoadData | null> {
//     if (!userId) return null;
//     const docRef = doc(db, COLLECTION_NAME, userId);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       return docSnap.data() as LoadData;
//     }
//     return null;
//   }

//   async set(userId: string, data: NewLoadData): Promise<LoadData> {
//     if (!userId) throw new Error("User ID is required to save data.");
    
//     const docRef = doc(db, COLLECTION_NAME, userId);
//     const existingData = (await this.get(userId));
//     const now = new Date().toISOString();

//     const dataToSave: LoadData = {
//       ...data,
//       createdAt: existingData?.createdAt || now,
//       updatedAt: now,
//     };

//     await setDoc(docRef, dataToSave, { merge: true });
//     return dataToSave;
//   }

//   async delete(userId: string): Promise<void> {
//     if (!userId) throw new Error("User ID is required to delete data.");
//     const docRef = doc(db, COLLECTION_NAME, userId);
//     await deleteDoc(docRef);
//   }
// }
