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
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule),
      },
      {
        path: 'ui-features',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/ui-features/ui-features.module')
          .then(m => m.UiFeaturesModule),
      },
      {
        path: 'infinite',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/layout/layout.module')
          .then(m => m.LayoutModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'admin',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./admin/pages.module').then(m => m.PagesModule),
      },
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
