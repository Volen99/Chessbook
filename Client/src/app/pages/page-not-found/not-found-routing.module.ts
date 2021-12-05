import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import {NotFoundComponent} from './not-found.component';

const pageNotFoundRoutes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
    data: {
      meta: {
        title: `Page not found`
      }
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(pageNotFoundRoutes) ],
  exports: [ RouterModule ]
})
export class NotFoundRoutingModule {}
