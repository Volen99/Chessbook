import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {HttpService} from "../../core/backend/common/api/http.service";

@Injectable()
export class StreamersService {
  constructor(private api: HttpService) {
  }

  getLiveStreams(params: HttpParams) {
    if (params == null) {
      return this.api.get('streamers');
    }

    return this.api.get('streamers', {params});
  }

  getLiveStreamByUserLogin(userLogin: string) {
    return this.api.get('streamers/user/' + userLogin);
  }

  getChessbookUsersStream(params: HttpParams) {
    if (params == null) {
      return this.api.get('streamers/users');
    }

    return this.api.get('streamers/users', {params});
  }

  saveTwitchLoginName(userLogin: string) {
    return this.api.post('streamers/save/' + userLogin, {});
  }

  editTwitchLoginName(userLogin: string, userId: number) {
    return this.api.post('streamers/edit/' + userLogin, {userId});
  }

  deleteTwitchLoginName(userLogin: string, userId: number) {
    return this.api.post('streamers/delete/' + userLogin, {userId});
  }
}
