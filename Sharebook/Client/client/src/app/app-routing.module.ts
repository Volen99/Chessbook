import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { CustomReuseStrategy } from '@app/core/routing/custom-reuse-strategy';
import { MenuGuards } from '@app/core/routing/menu-guard.service';
import { PreloadSelectedModulesList } from './core';
import { EmptyComponent } from './empty.component';
import { POSSIBLE_LOCALES } from '@shared/core-utils/i18n';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'explore',
    loadChildren: () => import('./explore/explore.module').then(m => m.ExploreModule),
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule),
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)
  },
  {
    path: 'admin',
    canActivate: [ MenuGuards.close() ],
    canDeactivate: [ MenuGuards.open() ],
    loadChildren: () => import('./+admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./my-account/my-account.module').then(m => m.MyAccountModule)
  },
  {
    path: 'my-library',
    loadChildren: () => import('./my-library/my-library.module').then(m => m.MyLibraryModule)
  },
  {
    path: 'verify-account',
    loadChildren: () => import('./signup/verify-account/verify-account.module').then(m => m.VerifyAccountModule)
  },
  {
    path: 'video-channels',
    loadChildren: () => import('./video-channels/video-channels.module').then(m => m.VideoChannelsModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/register/register.module').then(m => m.RegisterModule)
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
    path: 'keyboard_shortcuts',
    outlet: 'keyboard_shortcuts',
    loadChildren: () => import('./core/keyboard-shortcuts/keyboard-shortcuts.module').then(m => m.KeyboardShortcutsModule),
  },
  {
    path: 'display',
    /*outlet: 'display',*/
    loadChildren: () => import('./core/display/display.module').then(m => m.DisplayModule),
  },
  {
    path: '',
    component: EmptyComponent // Avoid 4õ4, app component will redirect dynamically
  }
];

// Avoid 4õ4 when changing language
for (const locale of POSSIBLE_LOCALES) {
  routes.push({
    path: locale,
    component: EmptyComponent
  });
}

routes.push({
  path: '**',
  loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
});

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: Boolean(history.pushState) === false,
      scrollPositionRestoration: 'disabled',
      preloadingStrategy: PreloadSelectedModulesList,
      anchorScrolling: 'disabled'
    })
  ],
  providers: [
    MenuGuards.guards,
    PreloadSelectedModulesList,
    {
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy
    }
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
