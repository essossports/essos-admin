import {
  DocumentData,
  DocumentSnapshot,
  FirestoreDataConverter,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';

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
    public formHeading: string,
    public formDesc: string,
    public formTerms: string
  ) {}

  [key: string]: any;

}


export const tournamentConverter: FirestoreDataConverter<Tournament> = {
  toFirestore(tournament: Tournament): DocumentData {
    const data: any = {
      id: tournament.id,
      date: tournament.date,
      sport: tournament.sport,
      isLive: tournament.isLive,
      isCompleted: tournament.isCompleted,
      bannerLastDate: tournament.bannerLastDate,
      bannerDesc: tournament.bannerDesc,
      bannerTitle: tournament.bannerTitle,
      formHeading: tournament.formHeading,
      formDesc: tournament.formDesc,
      formTerms: tournament.formTerms
    };
    // Remove undefined fields
    Object.keys(data).forEach(key => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });

    return data;
  },
  fromFirestore(snapshot: DocumentSnapshot, options: SnapshotOptions): Tournament {
    const data = snapshot.data(options)!;
    return new Tournament(
      data['id'],
      data['date'],
      data['sport'],
      data['isLive'],
      data['isCompleted'],
      data['bannerLastDate'],
      data['bannerDesc'],
      data['bannerTitle'],
      data['formHeading'],
      data['formDesc'],
      data['formTerms']
    );
  }
};