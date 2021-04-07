import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class CountriesApi {
  private readonly apiController: string = 'countries';

  constructor(private api: HttpService) { }

  list(): Observable<any[]> {
    return this.api.get(this.apiController);
  }
}
