export class BookingModel {
  constructor(
    public id: string,
    public date: string,
    public name: string,
    public number: string,
    public email: string,
    public booking_type: string,
    public start_time: string,
    public end_time: string,
    public total_amount: string,
    public amount_received: string,
    public balance: string,
    public comments: string
  ) {}
}
