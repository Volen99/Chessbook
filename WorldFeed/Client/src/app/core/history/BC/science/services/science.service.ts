import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {Observable} from 'rxjs';
import {AppState} from '../../../../../store/app.state';
import {Store} from '@ngrx/store';
import {GetAllPosts} from '../../../../../store/posts/actions/posts.actions';
import {map} from 'rxjs/operators';
import {PostModel} from '../interfaces/post.model.';

@Injectable()
export class ScienceService {
  private http: HttpClient;
  private store: Store<AppState>;

  private uploadPath: string = environment.historyBCSciencePost + 'media' + '/upload';
  private uploadPathWithoutSlash = this.uploadPath.slice(0, -1);
  private removeMediaPath: string = environment.historyBCSciencePost + 'media' + '/remove';
  private createTextPath: string = environment.historyBCSciencePost + 'text' + '/create';
  private getPostsPath: string = environment.historyBCScience + 'post' + '/getAll';

  constructor(store: Store<AppState>, http: HttpClient) {
    this.store = store;
    this.http = http;
  }

  getAllPosts() {
    return this.http.get(this.getPostsPath)
      .pipe(map((res: Response) => {
        const posts: PostModel[] = [];
        for (const post of res.data) {
          posts.push(post);
        }
        this.store.dispatch(new GetAllPosts(posts));
      }));
  }


  upload(formData): Observable<Array<File>> {
    // @ts-ignore
    return this.http.post(this.uploadPath, formData, {
      // reportProgress: true,
      // observe: 'events',
    });
  }

  createText(text: string, postId: number): Observable<string> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    // @ts-ignore
    return this.http.post(this.createTextPath, {text, postId}, {
      reportProgress: true,
      observe: 'events',
      headers,
    });
  }

  removeMedia(mediaId: number): Observable<string> {
    // @ts-ignore
    return this.http.post(this.removeMediaPath, mediaId, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
