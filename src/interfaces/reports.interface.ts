export interface IReport {
  place: string;
  date: Date;
  description: string;
  suspects: string[];
}

export interface IGetReportsArgs {
  licensePlate: string;
}
