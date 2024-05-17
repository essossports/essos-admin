import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tournament } from '../../models/tournament';

@Component({
  selector: 'app-edit-tournament-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-tournament-form.component.html',
  styleUrl: './edit-tournament-form.component.css'
})
export class EditTournamentFormComponent {
  @Input() tournament!: Tournament;

  tourForm = new FormGroup({
    heading: new FormControl(''),
    description: new FormControl(''),
    terms: new FormControl(''),
  });

  onSubmit() {
    console.log(this.tourForm.value);
  }
}
