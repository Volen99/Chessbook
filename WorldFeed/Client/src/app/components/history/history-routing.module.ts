import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewComponent} from './view/view.component';
import {BCViewComponent} from './BC/view/BC-view.component';

const routes: Routes = [
  { path: '', component: ViewComponent },
  { path: 'BC', component: BCViewComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class HistoryRoutingModule { }
