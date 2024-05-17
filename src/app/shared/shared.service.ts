import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';
import { BookingModel } from '../booking-model';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  currentPage: string = 'home';
  // currentPage: string = 'excel-match';
  // currentPage: string = 'excel-form';
  lastPage: string = 'home';

  showBookingsForYear: number = new Date().getFullYear();
  showBookingsForMonth: number = new Date().getMonth() + 1;

  
  tournamentModalTitle = "";
  tournamentModalType = "";
  tournamentModalValue = "";
  tournamentId = "";

  pages = {
    'home': 'home',
    'excel-match': 'excel-match',
    'excel-form': 'excel-form',
    'all-booking': 'all-booking',
    'add-booking': 'add-booking',
  }

  bookingForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    date: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    number: new FormControl(''),
    email: new FormControl(''),
    booking_type: new FormControl(''),
    start_time: new FormControl(''),
    end_time: new FormControl(''),
    total_amount: new FormControl(0),
    amount_received: new FormControl(0),
    balance: new FormControl(0),
    comments: new FormControl(''),
  });

  convertTimestampToDateStr(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    return date.toISOString().split('T')[0];
  }

  createNewBooking(): BookingModel {
    return new BookingModel(
      "",
      Timestamp.now(),
      "",
      0,
      "",
      "",
      "",
      "",
      0,
      0,
      0,
      "",
    );
  }

  bookingDictToModel(bookDict: { [key: string]: any }): BookingModel {
    return new BookingModel(
      bookDict['id'],
      bookDict['date'],
      bookDict["name"],
      bookDict["number"],
      bookDict["email"],
      bookDict["booking_type"],
      bookDict["start_time"],
      bookDict["end_time"],
      bookDict["total_amount"],
      bookDict["amount_received"],
      bookDict["balance"],
      bookDict["comments"],
    );
  }

  getBookingData(bookingData: any) {
    const bookingModel = new BookingModel(
      "",
      bookingData.date,
      bookingData.name,
      bookingData.number,
      bookingData.email,
      bookingData.booking_type,
      bookingData.start_time,
      bookingData.end_time,
      bookingData.total_amount,
      bookingData.amount_received,
      bookingData.balance,
      bookingData.comments,
    );
    const bookingDictionary = bookingModel.toDictionary();
    // dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
    // bookingDictionary.date = Timestamp.fromDate(bookingDictionary.date);
    bookingDictionary.date = this.htmlDateToTimestamp(bookingDictionary.date);
    return bookingDictionary;
  }

  firstExcelData: any[] = [];
  fullExcelData: any[] = [];

  
  getBookingForm() : FormGroup {
    return this.bookingForm;
  }

  openPageExcelUpload() {
    this.currentPage = ""
  }

  setCurrentPage(name: string) {
    if (name === "previous") {
      this.currentPage = this.lastPage;
      this.lastPage = 'home';
    } else {
      this.currentPage = name;
    }
  }

  // updateBooking() {
  //   this.bookingForm.patchValue({'name':"msb"});
  //   this.currentPage = "add-booking";
  // }

  htmlDateToTimestamp(date: string): Timestamp {
    const originalDate = new Date(date);
    const modifiedDate = new Date(originalDate.getFullYear(), originalDate.getMonth(), originalDate.getDate(), 0, 1, 0);
    return Timestamp.fromDate(modifiedDate);
  }

  calculateDurationHours(startTime: string, endTime: string): number {
    const allTimes = new ConstantsService().startTimes;
    const startTimeIndex = allTimes.indexOf(startTime.toLowerCase());
    const endTimeIndex = allTimes.indexOf(endTime.toLowerCase());

    if (startTimeIndex === -1 || endTimeIndex === -1) {
      // Handle error: start time or end time not found in the times array
      return 0;
    }

    const durationIndexDifference = endTimeIndex - startTimeIndex;
    const durationHours = durationIndexDifference * 0.5;

    return durationHours;
  }
  
  updateBooking(id: string, bookings: BookingModel[]) {
    const booking = bookings.find((b) => b.id === id)!;
    this.bookingForm.patchValue({
      id: booking.id,
      date: this.formatDate(booking.date),
      name: booking.name,
      number: booking.number,
      email: booking.email,
      booking_type: booking.booking_type,
      start_time: booking.start_time?.toLowerCase() ?? null,
      end_time: booking.end_time?.toLowerCase() ?? null,
      total_amount: booking.total_amount,
      amount_received: booking.amount_received,
      balance: booking.balance,
      comments: booking.comments,
    });
    // this.lastPage = this.pages['all-booking'];
    // this.currentPage = 'add-booking';
  }

  
  private formatDate(date: Timestamp) {
    const d = date.toDate();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  constructor() { }
}
