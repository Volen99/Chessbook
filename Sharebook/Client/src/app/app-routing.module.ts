import {NgModule} from '@angular/core';
import {Routes, RouterModule, RouteReuseStrategy} from '@angular/router';
import {POSSIBLE_LOCALES} from "./shared/core-utils/i18n/i18n";
import {EmptyComponent} from "./empty.component";
import {MenuGuards} from "./core/routing/menu-guard.service";
import {PreloadSelectedModulesList} from "./core/routing/preload-selected-modules-list";
import {CustomReuseStrategy} from "./core/routing/custom-reuse-strategy";

// It matters how routes are arranged!
const routes: Routes = [
  {
    path: 'admin',
    canActivate: [ MenuGuards.close() ],
    canDeactivate: [ MenuGuards.open() ],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./my-account/my-account.module').then(m => m.MyAccountModule)
  },
  // {
  //   path: 'my-library',
  //   loadChildren: () => import('./my-library/my-library.module').then(m => m.MyLibraryModule)
  // },
  {
    path: 'verify-account',
    loadChildren: () => import('./signup/+verify-account/verify-account.module').then(m => m.VerifyAccountModule)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule)
  },
  // {
  //   path: 'video-channels',
  //   loadChildren: () => import('./video-channels/video-channels.module').then(m => m.VideoChannelsModule)
  // },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/+register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'videos',
    loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule)
  },
  {
    path: '',
    component: EmptyComponent // Avoid 404, app component will redirect dynamically
  }
];

// Avoid 4õ4 when changing language
for (const locale of POSSIBLE_LOCALES) {
  routes.push({
    path: locale,
    component: EmptyComponent,
  });
}

routes.push({
  path: '**',
  loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
});

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [
    MenuGuards.guards,
    PreloadSelectedModulesList,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
