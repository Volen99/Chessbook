import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {TournamentsComponent} from "./tournaments.component";

const routes: Routes = [
  {
    path: '',
    component: TournamentsComponent,
    data: {
      meta: {
        title: `Tournaments`
      }
    },
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class TournamentsRoutingModule {
}
