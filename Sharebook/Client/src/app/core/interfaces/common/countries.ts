import { Observable } from 'rxjs';

export interface Country {
  id: number;
  name: string;
}

export abstract class CountryData {
  abstract list(): Observable<Country[]>;
}
