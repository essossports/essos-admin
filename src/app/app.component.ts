import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { SharedService } from './shared/shared.service';
import { BookingsComponent } from './home/bookings/bookings.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BookingformComponent } from './home/bookingform/bookingform.component';
import { AllbookingsComponent } from './home/allbookings/AllbookingsComponent';
import { ExcelFormComponent } from './home/excel-form/excel-form.component';
import { ExcelMatchComponent } from './home/excel-match/excel-match.component';
import { TournamentComponent } from './home/tournament/tournament.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    CommonModule,
    BookingsComponent,
    NavbarComponent,
    BookingformComponent,
    AllbookingsComponent,
    ExcelFormComponent,
    ExcelMatchComponent,
    TournamentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})


export class AppComponent {
  title = 'angular-essos';
  isLoggedin: boolean | null = null;

  firebaseAuth = inject(Auth);

  // currentPage: string = 'home'; // Default to home page
  sharedService = inject(SharedService);
  router = inject(Router);

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, redirect to home page
        console.log("checkLoginStatus: redirecting to home")
        this.router.navigateByUrl('/edit-tournament');
        this.isLoggedin = true;
      } else {
        // User is not signed in, redirect to login page
        console.log("checkLoginStatus: redirecting to login.");
        this.router.navigateByUrl('/login');
        this.isLoggedin = false;
      }
    });
  }
}
