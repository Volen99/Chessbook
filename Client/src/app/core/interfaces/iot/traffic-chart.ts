import { Observable } from 'rxjs';

export abstract class TrafficChartData {
  abstract getTrafficChartData(period: string): Observable<number[]>;
}
