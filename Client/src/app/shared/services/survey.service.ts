import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class SurveyService {

  constructor(private http: HttpClient) {
  }

  get apiUrl(): string {
    return environment.apiUrl;
  }

  publish(poll: any) {
    return this.http.post(this.apiUrl + '/survey/create', poll);
  }

  vote(selected: {}) {
    return this.http.post(this.apiUrl + `/poll/vote/${selected}`, {});
  }
}
