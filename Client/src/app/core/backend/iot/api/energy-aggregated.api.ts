import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../../common/api/http.service';

@Injectable()
export class EnergyAggregatedApi {

  private readonly apiController: string = 'energy-aggregated';

  constructor(private api: HttpService) {}

  getSolar(): Observable<any> {
    return this.api.get(`${this.apiController}/summary`);
  }

  getList(yearsCount: number): Observable<any> {
    const params = new HttpParams()
      .set('countOfYears', `${yearsCount}`);

    return this.api.get(`${this.apiController}/history`, { params });
  }

  getListAggregated(period: string): Observable<any> {
    const params = new HttpParams()
      .set('period', `${period}`);

    return this.api.get(`${this.apiController}`, { params });
  }
}
