import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../common/api/http.service';

@Injectable()
export class DevicesApi {

  private readonly apiController: string = 'devices';

  constructor(private api: HttpService) {}

  list(): Observable<any> {
    return this.api.get(this.apiController);
  }

  add(device: any): Observable<any> {
    return this.api.post(this.apiController, device);
  }

  edit(device: any): Observable<any> {
    return this.api.put(`${this.apiController}/${device.id}`, device);
  }

  get(id: number): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`);
  }
}
