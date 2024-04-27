import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // currentPage: string = 'home';
  // currentPage: string = 'excel-match';
  currentPage: string = 'excel-form';

  pages = {
    'home': 'home',
    'excel-match': 'excel-match',
    'excel-form': 'excel-form',
  }

  bookingForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    date: new FormControl(''),
    name: new FormControl('', Validators.required),
    number: new FormControl(''),
    email: new FormControl(''),
    booking_type: new FormControl(''),
    start_time: new FormControl(''),
    end_time: new FormControl(''),
    total_amount: new FormControl(''),
    amount_received: new FormControl(''),
    balance: new FormControl(''),
    comments: new FormControl(''),
  });

  firstExcelData: any[] = [];
  fullExcelData: any[] = [];

  
  getBookingForm() : FormGroup {
    return this.bookingForm;
  }

  openPageExcelUpload() {
    this.currentPage = ""
  }

  setCurrentPage(name: string) {
    this.currentPage = name;
  }

  // updateBooking() {
  //   this.bookingForm.patchValue({'name':"msb"});
  //   this.currentPage = "add-booking";
  // }
  

  constructor() { }
}
