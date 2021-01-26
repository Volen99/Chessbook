import { Observable } from 'rxjs';

export interface SolarEnergyStatistics {
  unitOfMeasure: string;
  totalValue: number;
  solarValue: number;
  percent: number;
}

export abstract class SolarData {
  abstract getSolarData(): Observable<SolarEnergyStatistics>;
}
