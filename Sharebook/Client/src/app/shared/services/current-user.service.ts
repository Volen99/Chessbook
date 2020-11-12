import {Injectable} from '@angular/core';
import {User} from "../../core/Core/Models/User";

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {

  constructor() {

  }

  public user: User;
}
