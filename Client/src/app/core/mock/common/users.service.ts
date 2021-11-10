import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

import { IUser, UserData } from '../../interfaces/common/users';
import { UserCreate } from 'app/shared/models/users/user-create.model';
import { UserUpdate } from 'app/shared/models/users/user-update.model';
import {ComponentPaginationLight} from "../../rest/component-pagination.model";

@Injectable()
export class UsersService extends UserData {
    getYourBirthday(userId: number) {
        throw new Error('Method not implemented.');
    }
    updateCurrentPersonal(body: any): Observable<IUser> {
        throw new Error('Method not implemented.');
    }
    getUserWithCache(userId: number) {
        throw new Error('Method not implemented.');
    }
    getUser(userId: number, withStats: boolean) {
        throw new Error('Method not implemented.');
    }
    getAnonymousUser() {
        throw new Error('Method not implemented.');
    }

  addUser(userCreate: UserCreate) {
      throw new Error('Method not implemented.');
  }
  banUsers(usersArg: IUser | IUser[], reason?: string) {
      throw new Error('Method not implemented.');
  }
  unbanUsers(usersArg: IUser | IUser[]) {
      throw new Error('Method not implemented.');
  }
  removeUser(usersArg: IUser | IUser[]) {
      throw new Error('Method not implemented.');
  }
  updateUser(userId: number, userUpdate: UserUpdate) {
      throw new Error('Method not implemented.');
  }
  updateUsers(users: IUser[], userUpdate: UserUpdate) {
      throw new Error('Method not implemented.');
  }

  get gridDataSource(): DataSource {
    return new LocalDataSource(this.data);
  }

  getCurrentUser(): Observable<IUser> {
    return observableOf(this.data[0]);
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<IUser[]> {
    return observableOf(this.data);
  }

  get(id: number): Observable<IUser> {
    return observableOf(this.data.find(x => x.id === id));
  }

  updateCurrent(user: IUser): Observable<IUser> {
    this.data[0] = user;

    return observableOf(user);
  }

  update(user: IUser): Observable<IUser> {
    const i = this.data.indexOf(this.data.find(x => x.id === user.id));
    if (i >= 0) {
      this.data[i] = user;
    }
    return observableOf(user);
  }

  create(user: IUser): Observable<IUser> {
    user.id = Math.max(...this.data.map(x => x.id)) + 1;
    this.data.push(user);
    return observableOf(user);
  }

  delete(id: number): Observable<boolean> {
    this.data = [...this.data.filter(x => x.id !== id)];
    return observableOf();
  }

   private data: IUser[];

  pagination: ComponentPaginationLight = {
    currentPage: 1,
    itemsPerPage: 3,
  };
    getUsers({pagination}) {
    } // = [
  //   {
  //     id: 1,
  //     role: UserRole.ADMINISTRATOR,
  //     firstName: 'Mark',
  //     lastName: 'Walmart',
  //     login: '@mdo',
  //     email: 'mdo@gmail.com',
  //     age: 0,
  //     picture: '',
  //     address: {
  //       street: 'Wall St.',
  //       city: 'New York',
  //       zipCode: '10005',
  //     },
  //     settings: {
  //       themeName: 'cosmic',
  //     },
  //     screenName: 'love is the way',
  //     protected: false,
  //   },
  //   {
  //     id: 2,
  //     role: 'user',
  //     firstName: 'Jacob',
  //     lastName: 'Cuba',
  //     login: '@mdo',
  //     email: 'mdo@gmail.com',
  //     age: 0,
  //     picture: '',
  //     address: {
  //       street: 'Wall St.',
  //       city: 'New York',
  //       zipCode: '10005',
  //     },
  //     settings: {
  //       themeName: 'cosmic',
  //     },
  //     screenName: 'love is the way',
  //     protected: false,
  //   },
  //   {
  //     id: 3,
  //     role: 'user',
  //     firstName: 'Larry',
  //     lastName: 'Page',
  //     login: '@twitter',
  //     email: 'twitter@outlook.com',
  //     age: 0,
  //     picture: '',
  //     address: {
  //       street: 'Wall St.',
  //       city: 'New York',
  //       zipCode: '10005',
  //     },
  //     screenName: 'love is the way',
  //     protected: true,
  //     settings: {
  //       themeName: 'cosmic',
  //     },
  //   },
  //   {
  //     id: 4,
  //     role: 'user',
  //     firstName: 'John',
  //     lastName: 'Snow',
  //     login: '@snow',
  //     email: 'snow@gmail.com',
  //     age: 0,
  //     picture: '',
  //     address: {
  //       street: 'Wall St.',
  //       city: 'New York',
  //       zipCode: '10005',
  //     },
  //     screenName: 'love is the way',
  //     protected: false,
  //     settings: {
  //       themeName: 'cosmic',
  //     },
  //   }];
}
