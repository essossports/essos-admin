import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css',
})
export class BookingsComponent {
  constructor(private sharedService: SharedService) {}

  showPage(page: string) {
    console.log(this.sharedService.bookingForm.value);
    this.sharedService.bookingForm.reset();
    this.sharedService.currentPage = page;
  }

  updateBooking() {
    // this.sharedService.updateBooking();
  }
}
