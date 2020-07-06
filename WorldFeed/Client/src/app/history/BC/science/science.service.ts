import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class ScienceService {
  private http: HttpClient;

  private uploadPath: string = environment.historyBCSciencePost + 'media' + '/upload';
  private removeMediaPath: string = environment.historyBCSciencePost + 'media' + '/remove';
  private createTextPath: string = environment.historyBCSciencePost + 'text' + '/create';
  private uploadPathWithoutSlash = this.uploadPath.slice(0, -1);

  constructor(http: HttpClient) {
    this.http = http;
  }

  upload(formData): Observable<Array<File>> {
    return this.http.post(this.uploadPath, formData, {
      // reportProgress: true,
      // observe: 'events',
    });
  }

  createText(text: string, postId: string): Observable<string> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post(this.createTextPath, {text, postId}, {
      reportProgress: true,
      observe: 'events',
      headers,
    });
  }

  removeMedia(mediaId: string): Observable<string> {
    // @ts-ignore
    return this.http.post(this.removeMediaPath, mediaId, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
