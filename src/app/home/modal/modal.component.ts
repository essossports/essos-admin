import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  inputValue: string = '';
  @Output() submitClicked = new EventEmitter<string>();
  
  isVisible = false;
  sharedService = inject(SharedService);


  openModal() {
    this.isVisible = true;
    console.log();
  }

  closeModal() {
    this.isVisible = false;
  }
  
  onSubmit() {
    // Emit the input field value when the submit button is clicked
    this.submitClicked.emit(this.inputValue);
  }
}
