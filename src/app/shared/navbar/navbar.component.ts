import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  firebaseAuth = inject(Auth);
  
  sharedService = inject(SharedService);

  logout(): void {
    console.log("Logging out");
    this.firebaseAuth.signOut();
  }

  showPage(page: string) {
    this.sharedService.currentPage = page;
  }
}
