import { Injectable, Query } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  QueryConstraint,
  QueryFieldFilterConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { BookingModel } from '../booking-model';
import { Tournament, tournamentConverter } from '../models/tournament';
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

  tournamentQueryCompleted = query(
      collection(this.db, 'tournament'),
      where('isCompleted', '==', false)
    ).withConverter(tournamentConverter);

  async getTournament(tournId:string): Promise<Tournament|undefined> {
    console.log('firestore getTournament');
    const docRef = doc(this.db, "tournament", tournId).withConverter(tournamentConverter);
    const docSnap  = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return undefined;
    }
  }

  async removeAllLandingTournament() {
    const q = query(
      collection(this.db, 'tournament'),
      where('isLanding', '==', true)
    );
    const querySnapshot = await getDocs(q);
    const updatePromises = querySnapshot.docs.map(async (documentSnapshot) => {
      const tournamentRef = doc(this.db, 'tournament', documentSnapshot.id);
      return updateDoc(tournamentRef, { isLanding: false });
    });
    await Promise.all(updatePromises);
    console.log('All landing-page tournaments have been updated to false.');
  }

  async setLandingTournament(id:string) {
    const docRef = doc(this.db, 'tournament', id);
    await updateDoc(docRef, {
      isLanding: true
    });
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
    console.log(data);
    // const dataObject = { ...data };
    const ref = doc(this.db, 'tournament', id).withConverter(
      tournamentConverter
    );
    await setDoc(ref, data);
  }

  async patchTournament(data: { [key: string]: any }, id: string) {
    const docRef = doc(this.db, 'tournament', id);
    await updateDoc(docRef, data);
    console.log('firestore service : patchTournament completed');
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
        docSnap.data()['bannerDesc']
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

  async getDefaultTourForm() {
    const docRef = doc(this.db, 'tournament', 'defaultForm');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return {};
    }
  }

  async setDefaultTourForm(data: { [key: string]: any }) {
    const docRef = doc(this.db, 'tournament', 'defaultForm');
    await setDoc(docRef, data);
    console.log('Setting defaultForm successfull');
  }
}
