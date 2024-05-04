import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirestoreService } from '../shared/firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-receiver',
  standalone: true,
  imports: [],
  templateUrl: './data-receiver.component.html',
  styleUrl: './data-receiver.component.css'
})
export class DataReceiverComponent {
  private subscription!: Subscription;
  constructor(private http: HttpClient, private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.subscription = this.http.post<any>('https://manage.essossports.com/receive-data', { key: 'value' }).subscribe(response => {
      console.log('Data received:', response);
      this.firestoreService.addBooking(response);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
