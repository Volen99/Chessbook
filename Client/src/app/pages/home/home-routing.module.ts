import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: {
      meta: {
        title: `Home`
      }
    },
    // duh? What the fuck have I done here?
    loadChildren: () => import('../../shared/timeline/timeline.module').then(m => m.TimelineModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class HomeRoutingModule {
}
