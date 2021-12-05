import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";

import {HttpService} from '../../../../../core/backend/common/api/http.service';
import {RestExtractor} from '../../../../../core/rest/rest-extractor';

@Injectable()
export class UploadService {

  constructor(private http: HttpService, private restExtractor: RestExtractor) {
  }

  uploadImage(pictureData: FormData) {
    return this.http.post('upload', pictureData)
      .pipe(catchError(res => this.restExtractor.handleError(res)));
  }
}
