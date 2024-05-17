import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ConstantsService } from '../../shared/constants.service';
import { SharedService } from '../../shared/shared.service';
import { BookingModel } from '../../booking-model';
import { FirestoreService } from '../../shared/firestore.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bookingform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './bookingform.component.html',
  styleUrl: './bookingform.component.css',
})
export class BookingformComponent {
  startTimes: string[] = [];
  bookingForm: FormGroup = new FormGroup({});
  constantsService = inject(ConstantsService);
  sharedService = inject(SharedService);
  firestoreService = inject(FirestoreService);
  constructor(private location: Location) {
    this.startTimes = this.constantsService.getStartTimes();
    this.bookingForm = this.sharedService.getBookingForm();
    console.log(this.bookingForm.value);
  }

  bookingData!: BookingModel;

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.bookingForm.value);
    this.bookingData = this.bookingForm.value;
    const bookData: BookingModel = this.sharedService.getBookingData(
      this.bookingData
    );
    if (this.bookingData.id !== null && this.bookingData.id !== '') {
      console.log('updateData()');
      // this.updateData();
      this.firestoreService.updateBooking(bookData, this.bookingData.id);
      // this.sharedService.currentPage = this.sharedService.lastPage;
      // this.sharedService.lastPage = 'home';
      this.location.back();
      this.bookingForm.reset();
    } else {
      console.log('addData()');
      this.firestoreService.addBooking(bookData);
      // this.addData();
      alert('Booking added!');
      this.bookingForm.reset();
    }
  }

  onDelete() {
    console.log('onDelete()');
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingData = this.bookingForm.value;
      this.firestoreService.deleteBooking(this.bookingData.id);
      console.log('Delete Successful');
      // this.sharedService.currentPage = this.sharedService.pages['all-booking'];
      this.location.back();
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
