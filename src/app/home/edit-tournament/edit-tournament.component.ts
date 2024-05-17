import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { SharedService } from '../../shared/shared.service';
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { Tournament } from '../../models/tournament';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../shared/firestore.service';
import { DefaultTournament } from '../../models/default-tournament';
import { FormControl, FormGroup } from '@angular/forms';
import { EditTournamentFormComponent } from '../edit-tournament-form/edit-tournament-form.component';

@Component({
  selector: 'app-edit-tournament',
  standalone: true,
  imports: [ModalComponent, CommonModule, EditTournamentFormComponent],
  templateUrl: './edit-tournament.component.html',
  styleUrl: './edit-tournament.component.css',
})
export class EditTournamentComponent implements OnInit, OnDestroy {
  sharedService = inject(SharedService);
  firestoreService = inject(FirestoreService);
  tournament: Tournament | undefined;
  defaultTournament: DefaultTournament | undefined;
  private unsubscribe!: () => void;
  @ViewChild('modal') modal!: ModalComponent;
  isVisible = false;
  tourId = '';
  tournamentModalTitle: string = '';
  tournamentModalType: string = '';
  tournamentModalValue: string = '';
  tournamentModalKey: string = '';

  openModal() {
    this.isVisible = true;
    console.log();
  }

  closeModal() {
    this.isVisible = false;
  }

  ngOnInit() {
    this.tourId = this.sharedService.tournamentId;
    this.getDefaultTour();
    this.listenData();
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      console.log('unsubscribing edit');
      this.unsubscribe();
    }
  }

  async getDefaultTour() {
    this.defaultTournament = await this.firestoreService.getDefaultTour();
  }

  listenData() {
    const db = getFirestore();
    const docRef = doc(db, 'tournament/' + this.tourId);
    this.unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        this.tournament = new Tournament(
          data['id'],
          data['date'],
          data['sport'],
          data['isLive'],
          data['isCompleted'],
          data['bannerLastDate'],
          data['bannerDesc'],
          data['bannerTitle'],
        );
        console.log('Document data:', this.tournament);
      } else {
        console.log('No such document!');
      }
    });
  }

  setTourModal(title: string, type: string, value: string, key: string) {
    this.tournamentModalTitle = title;
    this.tournamentModalType = type;
    this.tournamentModalValue = value;
    this.tournamentModalKey = key;
  }

  editHeading() {
    this.setTourModal(
      'Title',
      'text',
      this.tournament!.bannerTitle,
      'bannerTitle'
    );
  }

  editDate() {
    this.setTourModal(
      'Date',
      'date',
      this.sharedService.convertTimestampToDateStr(this.tournament!.date),
      'date'
    );
  }

  editDesc() {
    this.setTourModal(
      'Description',
      'text',
      this.tournament!.bannerDesc,
      'bannerDesc'
    );
  }

  editLastDate() {
    this.setTourModal(
      'Last Date',
      'date',
      this.sharedService.convertTimestampToDateStr(
        this.tournament!.bannerLastDate
      ),
      'bannerLastDate'
    );
  }

  onSubmit(key: string, val: string) {
    console.log('Submitted value:', val);
    const tourNew: Tournament = { ...this.tournament! };
    tourNew[key] = val;
    this.firestoreService.updateTournament(tourNew, this.tourId);
  }

  updateDefaults() {
    if (confirm('This will over ride previous defaults, continue?')) {
      this.firestoreService.setDefaultTour(
        new DefaultTournament(
          this.tournament!.bannerTitle,
          this.tournament!.bannerDesc
        )
      );
      this.defaultTournament!.bannerTitle = this.tournament!.bannerTitle;
      this.defaultTournament!.bannerDesc = this.tournament!.bannerDesc;
      alert('Setting defaults successfull');
    }
  }

  applyDefaults() {
    const tourNew: Tournament = { ...this.tournament! };
    tourNew.bannerTitle = this.defaultTournament!.bannerTitle;
    tourNew.bannerDesc = this.defaultTournament!.bannerDesc;
    this.firestoreService.updateTournament(tourNew, this.tourId);
  }
}
