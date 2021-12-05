import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { ServerDataSource } from 'ng2-smart-table';

import { environment } from '../../../../../environments/environment';

@Injectable()
export class HttpService {

  get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) {}

  getServerDataSource(uri: string): DataSource {
    return new ServerDataSource(this.http,
      {
        endPoint: uri,
        totalKey: 'totalCount',
        dataKey: 'items',
        pagerPageKey: 'pageNumber',
        pagerLimitKey: 'pageSize',
        filterFieldKey: 'filterBy#field#',
        sortFieldKey: 'sortBy',
        sortDirKey: 'orderBy',
      });
  }

  get<T>(endpoint: string, options?): Observable<any> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, options);
  }

  post<T>(endpoint: string, data, options?): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, options);
  }

  put(endpoint: string, data, options?): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data, options);
  }

  delete(endpoint: string, options?): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`, options);
  }
}
