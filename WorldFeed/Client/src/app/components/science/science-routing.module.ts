import {RouterModule, Routes} from '@angular/router';
import {ViewComponent} from './view/view.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  { path: '', component: ViewComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ScienceRoutingModule {}
