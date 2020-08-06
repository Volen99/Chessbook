import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MediaINITQueryParameters} from '../../interfaces/uploads/upload-media-INIT-query-parameters.model';
import {environment} from '../../../../environments/environment';

@Injectable()
export class UploadVideoService {
  private uploadPath: string = environment.scienceApiUrl + 'media' + '/upload/';
  private uploadPathWithoutSlash = this.uploadPath.slice(0, -1);

  private http: HttpClient;

  private query: MediaINITQueryParameters;

  constructor(http: HttpClient) {
    this.http = http;
  }

  INIT(queryString: string, formData) {
    return this.http.post(this.uploadPathWithoutSlash + queryString, formData); // ♥
  }

  APPEND(queryString: string, formData) {
    return this.http.post(this.uploadPathWithoutSlash + queryString, formData); // ♥
  }

  FINALIZE(queryString: string, formData) {
    return this.http.post(this.uploadPathWithoutSlash + queryString, formData); // ♥
  }
}
