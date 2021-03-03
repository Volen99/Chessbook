import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { UsersTableComponent } from './users-table/users-table.component';
import {AdminGuard} from "../../auth/admin.guard";

const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [
    {
      path: 'list',
      // canActivate: [AdminGuard],
      component: UsersTableComponent,
    },
    {
      path: 'edit/:id',
      // canActivate: [AdminGuard],
      component: UserComponent,
    },
    {
      path: 'current',
      component: UserComponent,
    },
    {
      path: 'add',
      // canActivate: [AdminGuard],
      component: UserComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {

}
