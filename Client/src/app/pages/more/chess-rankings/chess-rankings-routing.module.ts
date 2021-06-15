import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ChessRankingsComponent} from "./chess-rankings.component";

const routes: Routes = [
  {
    path: '',
    component: ChessRankingsComponent,
    data: {
      meta: {
        title: `Ratings`
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
export class ChessRankingsRoutingModule {
}
