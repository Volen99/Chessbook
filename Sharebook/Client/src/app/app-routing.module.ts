import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// It matters how routes are arranged!
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./shared/shared-routing.module').then(m => m.SharedRoutingModule),
  },
  {
    path: 'history',
    loadChildren: () => import('./components/history/history-routing.module').then(m => m.HistoryRoutingModule),
  },
  {
    path: 'science',
    loadChildren: () => import('./components/science/science-routing.module').then(m => m.ScienceRoutingModule),
  },
  {
    path: 'kids',
    loadChildren: () => import('./components/kids/kids-routing.module').then(m => m.KidsRoutingModule),
  },
  {
    path: 'programming',
    loadChildren: () => import('./components/programming/programming-routing.module').then(m => m.ProgrammingRoutingModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile-routing.module').then(m => m.ProfileRoutingModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
