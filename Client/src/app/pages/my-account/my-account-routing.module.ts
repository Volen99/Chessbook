import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MyAccountBlocklistComponent} from './my-account-blocklist/my-account-blocklist.component';
import {MyAccountSettingsComponent} from './my-account-settings/my-account-settings.component';
import {MyAccountComponent} from './my-account.component';
import {AuthGuard} from "../../auth/auth.guard";
import {MyDataComponent} from "./my-data/my-data.component";

const myAccountRoutes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full'
      },
      {
        path: 'settings',
        component: MyAccountSettingsComponent,
        data: {
          meta: {
            title: `Account settings`
          }
        }
      },
      {
        path: 'download_your_data',
        component: MyDataComponent,
        data: {
          meta: {
            title: `Download an archive of your data`
          }
        }
      },
      {
        path: 'blocklist/accounts',
        component: MyAccountBlocklistComponent,
        data: {
          meta: {
            title: `Blocked accounts`
          }
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(myAccountRoutes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule {
}
