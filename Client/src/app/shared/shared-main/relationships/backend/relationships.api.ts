import {Injectable} from "@angular/core";
import {HttpService} from "../../../../core/backend/common/api/http.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResultList} from "../../../models";
import {Post} from "../../post/post.model";

@Injectable()
export class RelationshipsApi {
  private readonly apiController: string = 'relationships';

  constructor(private api: HttpService) {

  }

  show(params: HttpParams, url: string) {
    return this.api.get(`${this.apiController}/${url}`, {params});
  }

}
