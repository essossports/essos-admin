import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tournament } from '../../models/tournament';
import { FirestoreService } from '../../shared/firestore.service';

@Component({
  selector: 'app-edit-tournament-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-tournament-form.component.html',
  styleUrl: './edit-tournament-form.component.css',
})
export class EditTournamentFormComponent implements OnChanges {
  firestoreService = inject(FirestoreService);
  @Input() tournament!: Tournament;

  ngOnChanges(changes: SimpleChanges) {
    if (this.tournament) {
      console.log('change detected: ', this.tournament);
      this.tourForm.patchValue({
        heading: this.tournament.formHeading,
        description: this.tournament.formDesc,
        terms: this.tournament.formTerms,
      });
    }
  }

  tourForm = new FormGroup({
    heading: new FormControl(''),
    description: new FormControl(''),
    terms: new FormControl(''),
  });

  onSubmit() {
    const formData = this.tourForm.value;
    const updateData: { [key: string]: any } = {};

    if (formData.heading !== undefined) {
      updateData['formHeading'] = formData.heading;
    }
    if (formData.description !== undefined) {
      updateData['formDesc'] = formData.description;
    }
    if (formData.terms !== undefined) {
      updateData['formTerms'] = formData.terms;
    }

    console.log(updateData);

    this.firestoreService.patchTournament(updateData, this.tournament.id);
    alert("Successfully updated");
  }

  updateDefaults() {
    if (confirm('This will override previous defaults, continue?')) {
      const formData = this.tourForm.value;
      const updateData: { [key: string]: any } = {};

      if (formData.heading !== undefined) {
          updateData['formHeading'] = formData.heading;
      }
      if (formData.description !== undefined) {
          updateData['formDesc'] = formData.description;
      }
      if (formData.terms !== undefined) {
          updateData['formTerms'] = formData.terms;
      }

      this.firestoreService.setDefaultTourForm(updateData);
      alert('Setting defaults successful');
  }
  }

  async applyDefaults() {
    const data = await this.firestoreService.getDefaultTourForm();
    this.tourForm.patchValue({
      heading:data['formHeading'],
      description:data['formDesc'],
      terms:data['formTerms'],
    });
  }

}
