import { Component, ViewChild, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { SharedService } from '../shared.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  firebaseAuth = inject(Auth);
  router = inject(Router);
  
  sharedService = inject(SharedService);

  logout(): void {
    console.log("Logging out");
    this.firebaseAuth.signOut();
  }

  // showPage(page: string) {
  //   if (page === "add-booking") {
  //     this.sharedService.bookingForm.reset();
  //   } 
  //     this.sharedService.lastPage = 'home';
  //     this.sharedService.currentPage = page;
  // }

  addBooking() {
    this.sharedService.bookingForm.reset();
    this.router.navigateByUrl("/booking-form");
  }


  collapseNavbar() {
    const navbarCollapse = document.getElementById('navbarColor02');
    if (navbarCollapse!.classList.contains('show')) {
      navbarCollapse!.classList.remove('show');
    }
  }
}
