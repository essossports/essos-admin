import { Timestamp } from "firebase/firestore";

export class Tournament {
  constructor(
    public id: string,
    public date: Timestamp,
    public sport: string,
    public isLive: boolean,
    public isCompleted: boolean,
    public bannerLastDate: Timestamp,
    public bannerDesc: string,
    public bannerTitle: string,
  ) {}

  [key: string]: any;
}
