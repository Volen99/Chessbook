import {Injectable} from '@angular/core';
import {User} from '../user/user.model';

@Injectable()
export class CurrentUserService {

  constructor() {

  }

  public user: User;
}
