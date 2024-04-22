import { Component, inject } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {
  sharedService = inject(SharedService);

  showPage(page: string) {
    this.sharedService.currentPage = page;
  }
}
