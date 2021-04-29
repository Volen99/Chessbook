import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpService} from "../../core/backend/common/api/http.service";

@Injectable()
export class StreamersService {
  constructor(private api: HttpService) {
  }

  getLiveStreams() {
    return this.api.get('streamers');
  }

  getLiveStreamByUserLogin(userLogin: string) {
    return this.api.get('streamers/user/' + userLogin);
  }

  getChessbookUsersStream() {
    return this.api.get('streamers/users');
  }

  saveTwitchLoginName(userLogin: string) {
    return this.api.post('streamers/save/' + userLogin, {});
  }

  editTwitchLoginName(userLogin: string, userId: number) {
    return this.api.post('streamers/edit/' + userLogin, {userId});
  }
}
