import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookingform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './bookingform.component.html',
  styleUrl: './bookingform.component.css'
})
export class BookingformComponent {
  bookingForm = new FormGroup({
    date: new FormControl(''),
    name: new FormControl(''),
    number: new FormControl(''),
    email: new FormControl(''),
    booking_type: new FormControl(''),
    start_time: new FormControl(''),
    end_time: new FormControl(''),
    total_amount: new FormControl(''),
    amount_received: new FormControl(''),
    balance: new FormControl(''),
    comments: new FormControl(''),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.bookingForm.value);
  }
}
