import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Timestamp, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { BookingModel } from '../../booking-model';
import { CommonModule } from '@angular/common';

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

  getDurhour(a:string,b:string) {
    return "";
  }
  updateBooking(id:string) {
    
  }
  
  async get2daysBooking() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const startD = new Date(year, month, 1);
    const q = query(
      collection(this.db, 'bookings'),
      where('date', '>=', Timestamp.fromDate(startD)),
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
