import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { ConstantsService } from '../../shared/constants.service';
import { SharedService } from '../../shared/shared.service';
import { BookingModel } from '../../booking-model';
import { FirestoreService } from '../../shared/firestore.service';

@Component({
  selector: 'app-bookingform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './bookingform.component.html',
  styleUrl: './bookingform.component.css',
})
export class BookingformComponent {
  startTimes: string[] = [];
  bookingForm: FormGroup = new FormGroup({});
  constantsService = inject(ConstantsService);
  sharedService = inject(SharedService);
  firestoreService = inject(FirestoreService);
  constructor() {
    this.startTimes = this.constantsService.getStartTimes();
    this.bookingForm = this.sharedService.getBookingForm();
    console.log(this.bookingForm.value);
  }

  bookingData!: BookingModel;



  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.bookingForm.value);
    this.bookingData = this.bookingForm.value;
    const bookData: BookingModel = this.sharedService.getBookingData(this.bookingData);
    if (this.bookingData.id !== null && this.bookingData.id !== "") {
      console.log("updateData()");
      // this.updateData();
      this.firestoreService.updateBooking(bookData, this.bookingData.id);
    this.sharedService.currentPage = this.sharedService.lastPage;
    } else {
      console.log("addData()");
      this.firestoreService.addBooking(bookData);
      // this.addData();
    }
  }

  onDelete() {
    console.log("onDelete()");
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingData = this.bookingForm.value;
      this.firestoreService.deleteBooking(this.bookingData.id);
      console.log("Delete Successful");
      this.sharedService.currentPage = this.sharedService.pages['all-booking'];
    }
  }

  

  

  // async addData() {
  //   const db = getFirestore();
  //   try {
  //     // const bookDoc = doc(collection(db, 'bookings'));
  //     console.log('writing document');
  //     const bookData = this.getBookingData();
  //     console.log(bookData);
  //     const bookDocRef = await addDoc(collection(db, 'bookings'), bookData);
  //     bookData.id = bookDocRef.id;
  //     await setDoc(bookDocRef, bookData);
  //     console.log('Document successfully written!');
  //     this.bookingForm.reset();
  //   } catch (error) {
  //     console.error('Error writing document: ', error);
  //   }
  // }
  

  // async updateData() {
  //   const db = getFirestore();
  //   const bookData: BookingModel = this.getBookingData();
  //   const bookDataObject = { ...bookData };
  //   await setDoc(
  //     doc(db, 'bookings', this.bookingData.id),
  //     bookDataObject
  //   );
  //   // this.sharedService.currentPage = 'all-booking';
  // }
  
}
