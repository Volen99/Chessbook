import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "./auth/auth.guard";
import {NotFoundComponent} from "./pages/page-not-found/not-found.component";
import {MetaGuard} from "./core/routing/meta-guard.service";
import {AdminGuard} from "./auth/admin.guard";
import {ModeratorGuard} from "./auth/moderator.guard";

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
        canActivateChild: [ MetaGuard ],
      },
      {
        path: 'explore',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/explore/explore.module').then(m => m.ExploreModule),
        canActivateChild: [ MetaGuard ],
      },
      {
        path: 'messages',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/messages/messages.module').then(m => m.MessagesModule),
        canActivateChild: [ MetaGuard ],
      },
      {
        path: 'ui-features',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/ui-features/ui-features.module').then(m => m.UiFeaturesModule),
        canActivateChild: [ MetaGuard ],
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
        canActivateChild: [ MetaGuard ],
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
        canActivateChild: [ MetaGuard ],
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canActivateChild: [ MetaGuard ],
      },
      {
        path: 'my-account',
        loadChildren: () => import('./pages/my-account/my-account.module').then(m => m.MyAccountModule),
        canActivateChild: [ MetaGuard ],
      },
      {
        path: 'admin',
        canActivate: [ModeratorGuard],
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivateChild: [ MetaGuard ],
      },
      {
        path: 'notifications',
        loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsModule),
        canActivateChild: [ MetaGuard ],
      },
      {
        path: 'streamers',
        loadChildren: () => import('./pages/streamers/streamers.module').then(m => m.StreamersModule),
        canActivateChild: [ MetaGuard ],
      },
      {
        path: 'connect',
        loadChildren: () => import('./pages/connect/connect.module').then(m => m.ConnectModule),
        canActivateChild: [ MetaGuard ],
      },
      {
        path: 'ratings',
        loadChildren: () => import('./pages/more/chess-rankings/chess-rankings.module').then(m => m.ChessRankingsModule),
        canActivateChild: [ MetaGuard ],
      },
      {
        path: ':screenName',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule),
        canActivateChild: [ MetaGuard ],
      },
      {
        path: ':screenName/post/:id',
        loadChildren: () => import('./shared/posts/post-watch/post-watch.module').then(m => m.PostWatchModule),
        canActivateChild: [ MetaGuard ],
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]
  },
];


// // ❗❗❗❗ BEWARE ❗❗❗❗
// // IF YOU CHANGE LEGACY, THIS WILL BREAK REDIRECT URL AFTER LOGIN AND REGISTER AAAAAAAAAAAAA
// const config: ExtraOptions = {
//   useHash: false,
//   // relativeLinkResolution: 'legacy', // you're required to use ../ rather than ./ when set to 'legacy'
// }; /*{
//     useHash: false,
//     relativeLinkResolution:
// };*/


const config: ExtraOptions = {
  useHash: false,
  relativeLinkResolution: 'legacy',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
