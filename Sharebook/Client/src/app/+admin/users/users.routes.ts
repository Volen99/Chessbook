import { Routes } from '@angular/router';
import { ServerConfigResolver, UserRightGuard } from '../../core';
import { UserRight } from '../../shared/models';
import { UserCreateComponent, UserUpdateComponent } from './user-edit';
import { UserListComponent } from './user-list';
import { UsersComponent } from './users.component';

export const UsersRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [ UserRightGuard ],
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
          serverConfig: ServerConfigResolver
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
