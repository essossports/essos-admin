import { Injectable } from '@angular/core';
import {
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { BookingModel } from '../booking-model';
import { Tournament } from '../models/tournament';
import { DefaultTournament } from '../models/default-tournament';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private db = getFirestore();

  constructor() {}

  async addData(data: any, docPath: string) {
    try {
      const docRef = await addDoc(collection(this.db, docPath), data);
      await setDoc(docRef, { ...data, id: docRef.id });
    } catch (error) {
      console.error('Error writing document: ', error);
      alert('Error writing document: ' + error);
    }
  }

  addTournament(data: Tournament) {
    console.log(data);
    this.addData({ ...data }, 'tournament');
  }

  async deleteTournament(id: string) {
    try {
      console.log('Deleting doc id', id);
      await deleteDoc(doc(this.db, 'tournament', id));
    } catch (error) {
      console.error('Error deleting document: ', error);
      alert('Error deleting document: ' + error);
    }
  }

  async updateTournament(data: Tournament, id: string) {
    console.log('firestore service: updating tournament');
    const dataObject = { ...data };
    await setDoc(doc(this.db, 'tournament', id), dataObject);
  }

  addBooking(bookData: BookingModel) {
    console.log(bookData);
    this.addData(bookData, 'bookings');
  }

  async updateBooking(bookData: BookingModel, id: string) {
    const bookDataObject = { ...bookData };
    await setDoc(doc(this.db, 'bookings', id), bookDataObject);
  }

  async deleteBooking(id: string) {
    await deleteDoc(doc(this.db, 'bookings', id));
  }

  async getDefaultTour(): Promise<DefaultTournament> {
    const docRef = doc(this.db, 'tournament', 'default');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return new DefaultTournament(
        docSnap.data()['bannerTitle'],
        docSnap.data()['bannerDesc'],
      );
    } else {
      return new DefaultTournament('x', 'x');
    }
  }

  async setDefaultTour(data: DefaultTournament) {
    const docRef = doc(this.db, 'tournament', 'default');
    await setDoc(docRef, { ...data });
    console.log('Setting default successfull');
  }
}
