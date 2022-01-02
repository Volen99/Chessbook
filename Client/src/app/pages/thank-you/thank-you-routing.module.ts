import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ThankYouComponent} from './thank-you.component';

const routes: Routes = [
  {
    path: '',
    component: ThankYouComponent,
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

export class ThankYouRoutingModule {
}
