import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {PostModel} from './interfaces/post.model';

@Injectable()
export class ScienceService {
  private http: HttpClient;

  private uploadPath: string = environment.historyBCSciencePost + 'media' + '/upload';
  private uploadPathWithoutSlash = this.uploadPath.slice(0, -1);
  private removeMediaPath: string = environment.historyBCSciencePost + 'media' + '/remove';
  private createTextPath: string = environment.historyBCSciencePost + 'text' + '/create';
  private getPostsPath: string = environment.historyBCScience + 'post' + '/getAll';

  constructor(http: HttpClient) {
    this.http = http;
  }

  getPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(this.getPostsPath);
  }

  upload(formData): Observable<Array<File>> {
    // @ts-ignore
    return this.http.post(this.uploadPath, formData, {
      // reportProgress: true,
      // observe: 'events',
    });
  }

  createText(text: string, postId: string): Observable<string> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    // @ts-ignore
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
