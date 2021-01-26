import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountriesApi } from '../api/countries.api';
import { CountryData, Country } from '../../../interfaces/common/countries';

@Injectable()
export class CountriesService extends CountryData {

  constructor(private api: CountriesApi) {
    super();
  }

  list(): Observable<Country[]> {
    return this.api.list();
  }
}
