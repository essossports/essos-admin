import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingModel } from '../../booking-model';
import { SharedService } from '../../shared/shared.service';
import { FormsModule } from '@angular/forms';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-excel-match',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './excel-match.component.html',
  styleUrl: './excel-match.component.css'
})
export class ExcelMatchComponent {
  formFields: string[] = [];
  selectedFields: string[] = [];

  constructor(private sharedService: SharedService) {
    const bookingModelInstance = new BookingModel('', '', '', '', '', '', '', '', '', '', '', '');
    const keys = Object.keys(bookingModelInstance).slice(1);
    keys.unshift('---');
    this.formFields = keys;
  }

  ngOnInit() {
    this.sharedService.firstExcelData.forEach((field, index) => {
      this.selectedFields[index] = this.formFields[0];
    });
  }

  
  firstExcelData = this.sharedService.firstExcelData;

  onSubmit() {
    console.log('Selected Fields:', this.selectedFields);
    this.sharedService.fullExcelData.forEach(element => {
      let selecEx: { [key: string]: any } = {};
      this.formFields.slice(1).forEach((option, i) => {
        const selectedFieldIndex = this.selectedFields.indexOf(option);
        if (selectedFieldIndex !== -1) {
          selecEx[option] = element[selectedFieldIndex];
        } else {
          selecEx[option] = '';
        }

      });
      console.log(selecEx);
      this.addData(selecEx);
    });
    // back to previous page
    
    this.sharedService.fullExcelData = [];
    this.sharedService.firstExcelData = [];
    this.sharedService.currentPage = this.sharedService.pages['excel-form'];
  }

  
  async addData(bookData: any) {
    const db = getFirestore();
    const bookDoc = doc(collection(db, 'bookings'));
    try {
      await setDoc(bookDoc, bookData);
      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  }

  getAlphabet(index: number): string {
    return String.fromCharCode(65 + index - 1); // 65 is ASCII code for 'A'
  }
}
