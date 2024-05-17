import { Component, inject } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Timestamp, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { BookingModel } from '../../booking-model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css',
})
export class BookingsComponent {
  private db = getFirestore();
  bookings: BookingModel[] = [];
  router = inject(Router);

  constructor(private sharedService: SharedService) {}



  // showPage(page: string) {
  //   console.log(this.sharedService.bookingForm.value);
  //   this.sharedService.bookingForm.reset();
  //   this.sharedService.currentPage = page;
  // }

  // updateBooking() {
  //   // this.sharedService.updateBooking();
  // }
  ngOnInit() {
    this.get2daysBooking();
  }

  getDurhour(start:string, end:string) {
    if (start != null && end != null) {
      
    return this.sharedService.calculateDurationHours(start, end);
    } else {
      return "x";
    }
  }

  updateBooking(id:string) {
    this.sharedService.updateBooking(id,this.bookings);
    // this.sharedService.lastPage = this.sharedService.pages['all-booking'];
    this.router.navigateByUrl("/booking-form");
  }
  
  async get2daysBooking() {
    // const year = new Date().getFullYear();
    // const month = new Date().getMonth();
    // const day = new Date().getDate();
    // const startD = new Date(year, month, day);
    console.log("get2daysBooking()");
    const startD = new Date().setHours(0,0,0,0);
    const startDay = new Date(startD);
    console.log(startDay);
    const q = query(
      collection(this.db, 'bookings'),
      where('date', '>=', Timestamp.fromDate(startDay)),
  );
    const querySnapshot = await getDocs(q);
    
    this.bookings = [];
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
}
