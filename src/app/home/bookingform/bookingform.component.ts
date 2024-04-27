import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { ConstantsService } from '../../shared/constants.service';
import { SharedService } from '../../shared/shared.service';

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
  constructor() {
    this.startTimes = this.constantsService.getStartTimes();
    this.bookingForm = this.sharedService.getBookingForm();
  }

  bookingData: any;

  

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.bookingForm.value);
    this.bookingData = this.bookingForm.value;
    if (this.bookingData.id !== '') {
      this.updateData();
    } else {
      this.addData();
    }
  }
  async updateData() {
    const db = getFirestore();
    await setDoc(
      doc(db, 'bookings', this.bookingData.id),
      this.getBookingData()
    );
    // this.sharedService.currentPage = 'all-booking';
  }

  getBookingData() {
    return {
      date: this.bookingData.date,
      name: this.bookingData.name,
      number: this.bookingData.number,
      email: this.bookingData.email,
      booking_type: this.bookingData.booking_type,
      start_time: this.bookingData.start_time,
      end_time: this.bookingData.end_time,
      total_amount: this.bookingData.total_amount,
      amount_received: this.bookingData.amount_received,
      balance: this.bookingData.balance,
      comments: this.bookingData.comments,
    };
  }

  async addData() {
    const db = getFirestore();
    const bookDoc = doc(collection(db, 'bookings'));
    const bookData = this.getBookingData();
    try {
      await setDoc(bookDoc, bookData);
      console.log('Document successfully written!');
      this.bookingForm.reset();
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  }
}
