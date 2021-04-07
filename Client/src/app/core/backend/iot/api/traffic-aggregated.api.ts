import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../../common/api/http.service';

@Injectable()
export class TrafficAggregatedApi {

  private readonly apiController: string = 'network-aggregated';

  constructor(private api: HttpService) {}

  getTraffic(period: string): Observable<any> {
    const params = new HttpParams()
      .set('period', `${period}`);

    return this.api.get(`${this.apiController}`, { params });
  }
}
