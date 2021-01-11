import {Routes} from '@angular/router';
import {UsersComponent} from './users.component';
import {UserUpdateComponent} from "./user-edit/user-update.component";
import {ServerConfigResolver} from "../../core/routing/server-config-resolver.service";
import {UserCreateComponent} from "./user-edit/user-create.component";
import {UserListComponent} from "./user-list/user-list.component";
import {UserRight} from "../../shared/models/users/user-right.enum";
import {UserRightGuard} from "../../core/routing/user-right-guard.service";

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
            title: $localize`Users list`
          }
        }
      },
      {
        path: 'create',
        component: UserCreateComponent,
        data: {
          meta: {
            title: $localize`Create a user`
          }
        },
        resolve: {
          serverConfig: ServerConfigResolver,
        }
      },
      {
        path: 'update/:id',
        component: UserUpdateComponent,
        data: {
          meta: {
            title: $localize`Update a user`
          }
        }
      }
    ]
  }
];
