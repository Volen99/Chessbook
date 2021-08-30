import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {TrendsListComponent} from "./trends-list.component";

const routes: Routes = [
  {
    path: '',
    component: TrendsListComponent,
    data: {
      meta: {
        title: `Trends`
      }
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class TrendsRoutingModule {
}
