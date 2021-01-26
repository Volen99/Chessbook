import { Observable } from 'rxjs';

export interface TrafficListItem {
  date: string;
  value: number;
  delta: {
    up: boolean;
    value: number;
  };
  comparison: Comparison;
}

export interface Comparison {
  prevDate: string;
  prevValue: number;
  nextDate: string;
  nextValue: number;
}

export abstract class TrafficListData {
  abstract getTrafficListData(period: string): Observable<TrafficListItem[]>;
}
