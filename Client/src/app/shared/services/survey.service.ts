import {Injectable} from "@angular/core";
import {HttpService} from "../../core/backend/common/api/http.service";

@Injectable()
export class SurveyService {

  constructor(private http: HttpService) {
  }

  publish(poll: any) {
    return this.http.post('survey/create', poll);
  }

  vote(selected: {}) {
    return this.http.post(`poll/vote/${selected}`, {});
  }
}
