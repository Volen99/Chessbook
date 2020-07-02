import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BCViewComponent} from './view/BC-view.component';
import {ScienceViewComponent} from './science/view/science-view.component';

const routes: Routes = [
  { path: 'history', component: BCViewComponent },
  { path: 'history/BC/science', component: ScienceViewComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class BCRoutingModule {}
