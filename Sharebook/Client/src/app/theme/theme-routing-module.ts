import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisplayComponent } from './components/display/display.component';

const routes: Routes = [
  {
    path: '',
    component: DisplayComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class ThemeRoutingModule {
}
