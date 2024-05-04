import { Injectable } from '@angular/core';
import { DocumentReference, addDoc, collection, deleteDoc, doc, getFirestore, setDoc } from 'firebase/firestore';
import { BookingModel } from '../booking-model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private db = getFirestore();

  constructor() { }

  async addBooking(bookData: BookingModel) {
    console.log(bookData);
    try {
      const bookDocRef = await addDoc(collection(this.db, 'bookings'), bookData);
      await setDoc(bookDocRef, { ...bookData, id: bookDocRef.id });
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  }

  async updateBooking(bookData: BookingModel, id: string) {
    const bookDataObject = { ...bookData };
    await setDoc(
      doc(this.db, 'bookings', id),
      bookDataObject
    );
  }

  async deleteBooking(id:string) {
    await deleteDoc(doc(this.db, 'bookings', id));
  }

}
