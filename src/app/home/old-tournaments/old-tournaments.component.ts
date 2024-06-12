import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Tournament } from '../../models/tournament';
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { FirestoreService } from '../../shared/firestore.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-old-tournaments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './old-tournaments.component.html',
  styleUrl: './old-tournaments.component.css',
})
export class OldTournamentsComponent implements OnInit, OnDestroy {
  private unsubscribe!: () => void;
  tournaments: Tournament[] = [];
  firestoreService = inject(FirestoreService);
  location = inject(Location);

  ngOnInit() {
    this.getAllTournament();
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      console.log('unsubscribing tournament');
      this.unsubscribe();
    }
  }

  goBack() {
    this.location.back();
  }

  async getAllTournament() {
    const db = getFirestore();
    const q = query(
      collection(db, 'tournament'),
      where('isCompleted', '==', true)
    );
    this.unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.tournaments = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      console.log('getAllTournament()');
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.tournaments.push({
          id: doc.id,
          date: data['date'],
          sport: data['sport'],
          isLive: data['isLive'],
          isCompleted: data['isCompleted'],
          isLanding: data['isLanding'],
          bannerLastDate: data['bannerLastDate'],
          bannerDesc: data['bannerDesc'],
          bannerTitle: data['bannerTitle'],
          formHeading: data['formHeading'],
          formDesc: data['formDesc'],
          formTerms: data['formTerms'],
        });
      });
    });
  }

  editTour(id: string) {}

  deleteTour(id: string) {
    const confirmed = window.confirm('Are you sure to Delete this tournament?');
    if (confirmed) {
      this.firestoreService.deleteTournament(id);
    }
  }

  incomplete(id: string) {
    const currentTour = this.tournaments.find(
      (tournament) => tournament.id === id
    );
    currentTour!.isCompleted = false;
    this.firestoreService.updateTournament(currentTour!, id);
  }
}
