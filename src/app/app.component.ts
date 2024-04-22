import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { SharedService } from './shared/shared.service';
import { BookingsComponent } from './home/bookings/bookings.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, CommonModule, BookingsComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-essos';
  isLoggedin: boolean | null = null;

  firebaseAuth = inject(Auth);

  // currentPage: string = 'home'; // Default to home page
  sharedService = inject(SharedService);
  // router = inject(Router);

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, redirect to home page
        // this.router.navigateByUrl('/');
        this.isLoggedin = true;
      } else {
        // User is not signed in, redirect to login page
        // this.router.navigateByUrl('/login');
        this.isLoggedin = false;
      }
    });
  }
}
