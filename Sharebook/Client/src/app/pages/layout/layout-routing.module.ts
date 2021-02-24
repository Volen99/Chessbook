import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import {InfiniteListComponent} from "./infinite-list/infinite-list.component";

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: 'infinite-list',
      component: InfiniteListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {
}
