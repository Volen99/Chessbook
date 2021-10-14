import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {TermsComponent} from "./terms.component";

const routes: Routes = [
  {
    path: '',
    component: TermsComponent,
    data: {
      meta: {
        title: `Terms of Service`
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

export class TermsRoutingModule {
}
