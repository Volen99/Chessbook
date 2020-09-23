import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProgrammingComponent} from './programming.component';

const routes: Routes = [
  { path: '', component: ProgrammingComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ProgrammingRoutingModule { }
