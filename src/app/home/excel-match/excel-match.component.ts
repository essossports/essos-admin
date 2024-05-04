import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BookingModel } from '../../booking-model';
import { SharedService } from '../../shared/shared.service';
import { FormsModule } from '@angular/forms';
import { Timestamp, collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { FirestoreService } from '../../shared/firestore.service';

@Component({
  selector: 'app-excel-match',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './excel-match.component.html',
  styleUrl: './excel-match.component.css'
})
export class ExcelMatchComponent {
  formFields: string[] = [];
  selectedFields: string[] = [];
  firestoreService = inject(FirestoreService);

  constructor(private sharedService: SharedService) {
    const bookingModelInstance = new BookingModel(
      '',
      Timestamp.now(),
      '',
      new Number,
      '',
      '',
      '',
      '',
      new Number,
      new Number,
      new Number,
      ''
    );
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
      // const selecEx: BookingModel = this.sharedService.createNewBooking();
      this.formFields.slice(1).forEach((option, i) => {
        const selectedFieldIndex = this.selectedFields.indexOf(option);
        if (selectedFieldIndex !== -1) {
          selecEx[option] = element[selectedFieldIndex];
          // if (option === "date") {
          //   selecEx[option] = this.sharedService.htmlDateToTimestamp(element[selectedFieldIndex]);
          // } else {
          //   selecEx[option] = element[selectedFieldIndex];
          // }
        } else {
          selecEx[option] = '';
        }

      });
      console.log(selecEx);
      // this.addData(selecEx);
      // const bookM: BookingModel = this.sharedService.bookingDictToModel(selecEx);
      const bookData: any = this.sharedService.getBookingData(selecEx);
      this.firestoreService.addBooking(bookData);
    });
    this.sharedService.fullExcelData = [];
    this.sharedService.firstExcelData = [];
    this.sharedService.currentPage = this.sharedService.lastPage;
    this.sharedService.lastPage = "home";
  }


  // async addData(bookData: any) {
  //   const db = getFirestore();
  //   const bookDoc = doc(collection(db, 'bookings'));
  //   try {
  //     await setDoc(bookDoc, bookData);
  //     console.log('Document successfully written!');
  //   } catch (error) {
  //     console.error('Error writing document: ', error);
  //   }
  // }

  getAlphabet(index: number): string {
    return String.fromCharCode(65 + index - 1); // 65 is ASCII code for 'A'
  }
}
