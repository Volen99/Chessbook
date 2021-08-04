import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import {IUser} from "../../../interfaces/common/users";
import {UserUpdateMe} from "../../../../shared/models/users/user-update-me.model";
import {Avatar} from "../../../../shared/models/users/avatars/avatar.model";
import {ResultList} from "../../../../shared/models";

@Injectable()
export class UsersApi {
  private readonly apiController: string = 'users';

  constructor(private api: HttpService) {}

  get usersDataSource(): DataSource {
    return this.api.getServerDataSource(`${this.api.apiUrl}/${this.apiController}`);
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<any[]> {
    const params = new HttpParams()
      .set('pageNumber', `${pageNumber}`)
      .set('pageSize', `${pageSize}`);

    return this.api.get(this.apiController, { params })
      .pipe(map(data => data.map(item => {
        const picture = `${this.api.apiUrl}/${this.apiController}/${item.id}/photo`;
        return { ...item, picture };
      })));
  }

  getCurrent(): Observable<any> {
    return this.api.get(`${this.apiController}/current`)
      .pipe(map(data => {
        const picture = `${this.api.apiUrl}/${this.apiController}/${data.id}/photo`;
        return { ...data, picture };
      }));
  }

  get(id: number): Observable<any> {
    debugger
    return this.api.get(`${this.apiController}/${id}`)
      .pipe(map(data => {
        const picture = `${this.api.apiUrl}/${this.apiController}/${data.id}/photo`;
        return { ...data, picture };
      }));
  }


  getProfile(url: string) {
    return this.api.get(`${this.apiController}/${url}`);
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(`${this.apiController}/${id}`);
  }

  add(item: any): Observable<any> {
    return this.api.post(this.apiController, item);
  }

  updateCurrent(item: any): Observable<any> {
    return this.api.put(`${this.apiController}/current`, item);
  }

  updateCurrentPersonal(item: any): Observable<any> {
    return this.api.put(`${this.apiController}/personal`, item);
  }

  update(item: any): Observable<any> {
    return this.api.put(`${this.apiController}/${item.id}`, item);
  }

  ban(url: string, body) {
    return this.api.post(`${this.apiController}/${url}`, body);
  }

  unban(url: string, body) {
    return this.api.post(`${this.apiController}/${url}`, body);
  }

  updateUser(id: number, body) {
    return this.api.put(`${this.apiController}/${id}`, body);
  }

  updateUsers(id: number, body) {
    return this.api.put(`${this.apiController}/${id}`, body);
  }

  getUser(id: number, params: HttpParams, withStats: boolean = false) {
    let url = `${this.apiController}/${id}`;
    if (withStats) {
      url = `admin/${this.apiController}/${id}`;
    }

    return this.api.get<IUser>(url, params);
  }

  changeEmail(url: string, body) {
    return this.api.put(`${this.apiController}/${url}`, body);
  }

  changePassword(url: string, body: UserUpdateMe) {
    return this.api.put(`${this.apiController}/${url}`, body);
  }

  changeAvatar(url, avatarForm: FormData) {
    return this.api.post<{avatar: Avatar}>(`${this.apiController}/${url}`, avatarForm);
  }

  changeBanner(url, bannerForm: FormData) {
    return this.api.post<{avatar: Avatar}>(`${this.apiController}/${url}`, bannerForm);
  }

  updateMyProfile(url: string, profile: UserUpdateMe) {
    return this.api.put(url, profile);
  }

  deleteMe(url) {
    return this.api.delete(`${this.apiController}/${url}`);
  }

  deleteAvatar(url: string) {
    return this.api.delete(`${this.apiController}/${url}`);
  }

  deleteBanner(url: string) {
    return this.api.delete(`${this.apiController}/${url}`);
  }

  getUsers(url: string, params: HttpParams) {
    return this.api.get(`${this.apiController}/${url}`, params);
  }

  getUsersForAdmin(url: string, params: HttpParams) {
    return this.api.get<ResultList<IUser>>(`admin/${this.apiController}/${url}`, params);
  }

  getYourBirthday(url: string, id: number) {
    return this.api.get(`${this.apiController}/${url}/${id}`);
  }
}
