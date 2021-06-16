import {Routes} from '@angular/router';
import {UserListComponent} from './user-list';
import {UsersComponent} from './users.component';
import {UserRight} from "../../shared/models/users/user-right.enum";
import {UserRightGuard} from "../../core/routing/user-right-guard.service";
import {UserUpdateComponent} from "./user-edit";

export const UsersRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [UserRightGuard],
    data: {
      userRight: UserRight.MANAGE_USERS
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: UserListComponent,
        data: {
          meta: {
            title: `Users list`
          }
        }
      },
      {
        path: 'update/:id',
        component: UserUpdateComponent,
        data: {
          meta: {
            title: `Update a user`
          }
        }
      }
    ]
  }
];
