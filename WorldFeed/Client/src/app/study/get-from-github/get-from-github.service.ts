import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class GetFromGithubService {
  private http: HttpClient;

  public profile: string;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getProfileFromGithub(profile: string): any {
    return this.http.get<string>(`https://api.github.com/users/${profile}`);
  }
}
