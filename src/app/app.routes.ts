import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BookingsComponent } from './home/bookings/bookings.component';
import { BookingformComponent } from './home/bookingform/bookingform.component';
import { AllbookingsComponent } from './home/allbookings/AllbookingsComponent';
import { ExcelFormComponent } from './home/excel-form/excel-form.component';
import { ExcelMatchComponent } from './home/excel-match/excel-match.component';
import { TournamentComponent } from './home/tournament/tournament.component';
import { OldTournamentsComponent } from './home/old-tournaments/old-tournaments.component';
import { EditTournamentComponent } from './home/edit-tournament/edit-tournament.component';

export const routes: Routes = [
  { path: '',component: BookingsComponent,title: 'Bookings' },
  { path: 'login',component: LoginComponent,title: 'Login' },
  { path: 'booking-form', component: BookingformComponent, title: 'Booking Form' },
  { path: 'all-bookings', component: AllbookingsComponent, title: 'All Bookings'},
  { path: 'excel-form', component: ExcelFormComponent, title: 'Excel Form' },
  { path: 'excel-match', component: ExcelMatchComponent, title: 'Excel Match' },
  { path: 'tournament', component: TournamentComponent, title: 'Tournament' },
  { path: 'old-tournaments', component: OldTournamentsComponent, title: 'Old Tournament' },
  { path: 'edit-tournament', component: EditTournamentComponent, title: 'Edit Tournament' },
  { path: '**', redirectTo: '' },
];
