import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'explore',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/explore/explore.module').then(m => m.ExploreModule),
      },
      {
        path: 'messages',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/messages/messages.module').then(m => m.MessagesModule),
      },
      {
        path: 'ui-features',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/ui-features/ui-features.module').then(m => m.UiFeaturesModule),
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'my-account',
        loadChildren: () => import('./pages/my-account/my-account.module').then(m => m.MyAccountModule),
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
      },
      {
        path: 'notifications',
        loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsModule),
      },
      {
        path: ':screenName',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule),
      },
      {
        path: ':username/post/:id',
        loadChildren: () => import('./shared/posts/post-watch/post-watch.module').then(m => m.PostWatchModule),
      }
    ]
  },

  //
  // {
  //   path: '**',
  //   redirectTo: 'pages'
  // },
];


const config: ExtraOptions = {
  useHash: false,
  // relativeLinkResolution: 'legacy', // TODO: was uncommented
}; /*{
    useHash: false,
    relativeLinkResolution: 'legacy'// you're required to use ../ rather than ./ when set to 'legacy'
};*/

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
