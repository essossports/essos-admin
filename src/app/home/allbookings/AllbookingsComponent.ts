import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { BookingModel } from '../../booking-model';
import { Timestamp } from 'firebase/firestore';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-allbookings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './allbookings.component.html',
  styleUrl: './allbookings.component.css',
})
export class AllbookingsComponent {
  constructor(private sharedService: SharedService) {
    this.bookMonthYear = new FormGroup({
      year: new FormControl(this.sharedService.showBookingsForYear), // Initialize with current year
      month: new FormControl(this.getMonthName(this.sharedService.showBookingsForMonth)) // Initialize with current month
    });
  }

  bookings: BookingModel[] = [];

  bookMonthYear!: FormGroup;
  years: number[] = [];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  async ngOnInit() {

    this.bookMonthYear.get('year')?.valueChanges.subscribe((value) => {
      console.log('Year changed:', value);
      // Call your function here
      this.sharedService.showBookingsForYear = value;
      console.log("updating year");
      this.bookings = [];
      this.getAllBooking();
    });

    // Subscribe to value changes of month form control
    this.bookMonthYear.get('month')?.valueChanges.subscribe((value) => {
      console.log('Month changed:', value);
      // Call your function here
      console.log("updating month", " - current :",  this.sharedService.showBookingsForMonth, "new :", value );
      this.sharedService.showBookingsForMonth = this.getMonthNumber(value);
      this.bookings = [];
      this.getAllBooking();
    });

    await this.getAllBooking();
    console.log(this.bookings);
    const currentYear = new Date().getFullYear();
    const startYear = 2021;
    this.years = Array.from({length: currentYear - startYear + 1}, (_, index) => startYear + index);
  }

  getMonthNumber(monthName: string): number {
    const index = this.months.indexOf(monthName);
      // Month index starts from 0, so adding 1 to get the month number
      return index + 1;
    
  }

  getMonthName(monthNumber: number): string {
    return this.months[monthNumber - 1];
  }


  async getAllBooking() {
    const db = getFirestore();
    // const q = query(collection(db, "cities"), where("capital", "==", true));
    const year = this.sharedService.showBookingsForYear;
    const month = this.sharedService.showBookingsForMonth;
    const startD = new Date(year, month - 1, 1); // Month is 0-based in JavaScript Date object
    const endD = new Date(year, month, 0);
    console.log("getAllBooking()", startD, endD);
    const q = query(
      collection(db, 'bookings'),
      where('date', '>=', Timestamp.fromDate(startD)),
      where('date', '<=', Timestamp.fromDate(endD))
  );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      const data = doc.data();
      // const bookingDate = "";
      // if (data['date'] !== null) {
      //   const dateParts = data['date'].split('-');
      //   const bookingDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
      // } 
    
    const booking = new BookingModel(
      doc.id,
      data['date'],
      data['name'],
      data['number'],
      data['email'],
      data['booking_type'],
      data['start_time'],
      data['end_time'],
      data['total_amount'],
      data['amount_received'],
      data['balance'],
      data['comments']
    );
      this.bookings.push(booking);
    });
  }

  updateBooking(id: string) {
    const booking = this.bookings.find((b) => b.id === id)!;
    this.sharedService.bookingForm.patchValue({
      id: booking.id,
      date: this.formatDate(booking.date),
      name: booking.name,
      number: booking.number,
      email: booking.email,
      booking_type: booking.booking_type,
      start_time: booking.start_time,
      end_time: booking.end_time,
      total_amount: booking.total_amount,
      amount_received: booking.amount_received,
      balance: booking.balance,
      comments: booking.comments,
    });
    this.sharedService.lastPage = this.sharedService.pages['all-booking'];
    this.sharedService.currentPage = 'add-booking';
  }

  private formatDate(date: Timestamp) {
    const d = date.toDate();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  getDurhour(start:string, end:string) {
    return this.sharedService.calculateDurationHours(start, end);
  }
}
