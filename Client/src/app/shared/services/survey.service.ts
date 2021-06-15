import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {HttpService} from "../../core/backend/common/api/http.service";

@Injectable()
export class SurveyService {

  constructor(private http: HttpService) { // HttpClient
  }

  publish(poll: any) {
    return this.http.post('survey/create', poll);
  }

  vote(selected: {}) {
    return this.http.post(`poll/vote/${selected}`, {});
  }
}
