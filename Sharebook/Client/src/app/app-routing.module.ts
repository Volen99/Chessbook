import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from './@auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./logged-out-home/logged-out-home.module').then(m => m.LoggedOutHomeModule),
    },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: () => import('app/admin/pages.module').then(m => m.PagesModule),
    },
    {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    },
    {
        path: 'explore',
        canActivate: [AuthGuard],
        loadChildren: () => import('./explore/explore.module').then(m => m.ExploreModule),
    },
    {
        path: 'notifications',
        canActivate: [AuthGuard],
        loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule),
    },
    {
        path: 'messages',
        canActivate: [AuthGuard],
        loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule),
    },
    {
        path: ':username',
        canActivate: [AuthGuard],
        loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('app/@auth/auth.module').then(m => m.AuthModule),
    },
    // {
    //     path: '',
    //     component: EmptyComponent, // Avoid 4õ4, app component will redirect dynamically
    // },
    {
        path: '**',
        redirectTo: 'pages',
    },
];

const config: ExtraOptions = {
    useHash: false,
    relativeLinkResolution: 'legacy',
}; /*{
    useHash: false,
    relativeLinkResolution: 'legacy'
};*/

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
