import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MyAccountAbusesListComponent} from './my-account-abuses/my-account-abuses-list.component';
import {MyAccountBlocklistComponent} from './my-account-blocklist/my-account-blocklist.component';
import {MyAccountNotificationsComponent} from './my-account-notifications/my-account-notifications.component';
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
        path: 'video-channels',
        redirectTo: '/my-library/video-channels',
        pathMatch: 'full'
      },

      {
        path: 'video-playlists',
        redirectTo: '/my-library/video-playlists',
        pathMatch: 'full'
      },
      {
        path: 'video-playlists/create',
        redirectTo: '/my-library/video-playlists/create',
        pathMatch: 'full'
      },
      {
        path: 'video-playlists/:videoPlaylistId',
        redirectTo: '/my-library/video-playlists/:videoPlaylistId',
        pathMatch: 'full'
      },
      {
        path: 'video-playlists/update/:videoPlaylistId',
        redirectTo: '/my-library/video-playlists/update/:videoPlaylistId',
        pathMatch: 'full'
      },

      {
        path: 'videos',
        redirectTo: '/my-library/videos',
        pathMatch: 'full'
      },
      {
        path: 'video-imports',
        redirectTo: '/my-library/video-imports',
        pathMatch: 'full'
      },
      {
        path: 'subscriptions',
        redirectTo: '/my-library/subscriptions',
        pathMatch: 'full'
      },
      {
        path: 'ownership',
        redirectTo: '/my-library/ownership',
        pathMatch: 'full'
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
      {
        path: 'history/videos',
        redirectTo: '/my-library/history/videos',
        pathMatch: 'full'
      },
      {
        path: 'notifications',
        component: MyAccountNotificationsComponent,
        data: {
          meta: {
            title: `Notifications`
          }
        }
      },
      {
        path: 'abuses',
        component: MyAccountAbusesListComponent,
        data: {
          meta: {
            title: `My abuse reports`
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
