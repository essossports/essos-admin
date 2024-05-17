import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirestoreService } from '../../shared/firestore.service';
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { SharedService } from '../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { Tournament } from '../../models/tournament';
import { Router, RouterLink } from '@angular/router';
import { DefaultTournament } from '../../models/default-tournament';

@Component({
  selector: 'app-tournament',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.css',
})
export class TournamentComponent implements OnInit, OnDestroy {
  sharedService = inject(SharedService);
  firestoreService = inject(FirestoreService);
  router = inject(Router)
  tournaments: Tournament[] = [];
  private unsubscribe!: () => void;

  ngOnInit() {
    this.getAllTournament();
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      console.log("unsubscribing tournament")
      this.unsubscribe();
    }
  }

  createTourForm = new FormGroup({
    date: new FormControl('', Validators.required),
    sport: new FormControl('cricket', Validators.required),
  });
  // {
  //   "date": this.sharedService.htmlDateToTimestamp(this.createTourForm.value.date!),
  //   "sport": this.createTourForm.value.sport,
  //   "isLive": false,
  // }
  async create() {
    console.log(this.createTourForm.value);
    const defaultTour: DefaultTournament = await this.firestoreService.getDefaultTour();
    const date: Date = new Date(this.createTourForm.value.date!);
    const lastDate: Date = new Date(date);
    lastDate.setDate(date.getDate() - 1);
    // const date: Timestamp = this.sharedService.htmlDateToTimestamp(this.createTourForm.value.date!);
    this.firestoreService.addTournament(
      new Tournament(
        '',
        Timestamp.fromDate(date),
        this.createTourForm.value.sport!,
        false,
        false,
        Timestamp.fromDate(lastDate),
        defaultTour.bannerDesc,
        defaultTour.bannerTitle,
      )
    );
    // this.tournaments = [];
    // this.getAllTournament();
  }

  deleteTour(id: string) {
    const confirmed = window.confirm('Are you sure to Delete this tournament?');
    if (confirmed) {
      this.firestoreService.deleteTournament(id);
    }
  }

  editTour(id: string) {
    this.sharedService.tournamentId = id;
    this.router.navigateByUrl("/edit-tournament");
  }


  complete(id: string) {
    const currentTour = this.tournaments.find(
      (tournament) => tournament.id === id
    );
    currentTour!.isCompleted = true;
    this.firestoreService.updateTournament(currentTour!, id);
  }

  async getAllTournament() {
    const db = getFirestore();
    const q = query(
      collection(db, 'tournament'),
      where('isCompleted', '==', false)
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
          bannerLastDate: data['bannerLastDate'],
          bannerDesc: data['bannerDesc'],
          bannerTitle: data['bannerTitle'],          
          formHeading: data['formHeading'],
          formDesc: data['formDesc'],
          formTerms: data['formTerms'],
        });
      });
    });
    // const q = query(collection(db, 'tournament'));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, ' => ', doc.data());
    //   const data = doc.data();

    //   this.tournaments.push({
    //     id: data['id'],
    //     date: data['date'],
    //     sport: data['sport'],
    //     isLive: data['isLive'],
    //   });
    // });
  }

  updateIsLive(id: string, event: Event) {
    const currentTour = this.tournaments.find(
      (tournament) => tournament.id === id
    );
    const checked = (event.target as HTMLInputElement).checked;
    const confirmDialog = checked
      ? 'Do you want to mark this event live?'
      : 'Do you want to mark this event not live?';
    const confirmed = window.confirm(confirmDialog);
    if (confirmed) {
      console.log('updateIsLive', id);
      currentTour!.isLive = checked;
      this.firestoreService.updateTournament(currentTour!, id);
    }
    else {
      (event.target as HTMLInputElement).checked = !checked;
    }
  }
}
