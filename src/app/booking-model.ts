import { Timestamp } from "firebase/firestore";

export class BookingModel {
  constructor(
    public id: string,
    public date: Timestamp,
    public name: string,
    public number: Number,
    public email: string,
    public booking_type: string,
    public start_time: string,
    public end_time: string,
    public total_amount: Number,
    public amount_received: Number,
    public balance: Number,
    public comments: string
  ) {}

  toDictionary(): any {
    return {
      id: this.id,
      date: this.date,
      name: this.name,
      number: this.number,
      email: this.email,
      booking_type: this.booking_type,
      start_time: this.start_time,
      end_time: this.end_time,
      total_amount: this.total_amount,
      amount_received: this.amount_received,
      balance: this.balance,
      comments: this.comments
    };
  }
}
