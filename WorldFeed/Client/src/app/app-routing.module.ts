import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// It matters how routes are arranged!
const routes: Routes = [
  {
    // TODO import might bug
    path: 'auth',
    loadChildren: () => import('./components/authentication/authentication-routing.module').then(m => m.AuthenticationRoutingModule)
  },
  {
    path: '',
    loadChildren: () => import('./core/shared-core/shared-routing.module').then(m => m.SharedRoutingModule),
  },
  {
    path: 'history',
    loadChildren: () => import('./components/history/history-routing.module').then(m => m.HistoryRoutingModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./core/profile/profile-routing.module').then(m => m.ProfileRoutingModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
