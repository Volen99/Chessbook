import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// It matters how routes are arranged!
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication-routing.module').then(m => m.AuthenticationRoutingModule)
  },
  {
    path: '',
    loadChildren: () => import('./shared/shared-routing.module').then(m => m.SharedRoutingModule),
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history-routing.module').then(m => m.HistoryRoutingModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
