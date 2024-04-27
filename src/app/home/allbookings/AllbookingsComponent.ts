import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { BookingModel } from '../../booking-model';

@Component({
  selector: 'app-allbookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allbookings.component.html',
  styleUrl: './allbookings.component.css',
})
export class AllbookingsComponent {
  constructor(private sharedService: SharedService) {}

  bookings: BookingModel[] = [];

  async ngOnInit() {
    await this.getAllBooking();
    console.log(this.bookings);
  }

  async getAllBooking() {
    const db = getFirestore();
    // const q = query(collection(db, "cities"), where("capital", "==", true));
    const querySnapshot = await getDocs(collection(db, 'bookings'));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      const booking: BookingModel = {
        id: doc.id,
        date: doc.data()['date'],
        name: doc.data()['name'],
        number: doc.data()['number'],
        email: doc.data()['email'],
        booking_type: doc.data()['booking_type'],
        start_time: doc.data()['start_time'],
        end_time: doc.data()['end_time'],
        total_amount: doc.data()['total_amount'],
        amount_received: doc.data()['amount_received'],
        balance: doc.data()['balance'],
        comments: doc.data()['comments'],
      };
      this.bookings.push(booking);
    });
  }

  updateBooking(id: string) {
    const booking = this.bookings.find((b) => b.id === id)!;
    this.sharedService.bookingForm.patchValue({
      id: booking.id,
      date: booking.date,
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
    this.sharedService.currentPage = 'add-booking';
  }
}
