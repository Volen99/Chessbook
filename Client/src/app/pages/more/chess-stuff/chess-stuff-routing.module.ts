import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ChessStuffComponent} from "./chess-stuff.component";

const routes: Routes = [
  {
    path: '',
    component: ChessStuffComponent,
    data: {
      meta: {
        title: `Miscellaneous`
      }
    },
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class ChessStuffRoutingModule {
}
