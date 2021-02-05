import {Injectable} from "@angular/core";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

import {HttpService} from "../../../core/backend/common/api/http.service";

@Injectable()
export class UploadApi {
  private readonly apiController: string = 'upload';

  constructor(private api: HttpService) {
  }

  initAsync(params: HttpParams): Observable<any> {
    return this.api.post(this.apiController,  {},{ params });
  }

  appendAsync(data, params: HttpParams): Observable<any> {
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/octet-stream");
    return this.api.post(this.apiController, data, { params, headers });
  }

  finalizeAsync(params: HttpParams): Observable<any> {
    return this.api.post(this.apiController, {},{ params });
  }

}
