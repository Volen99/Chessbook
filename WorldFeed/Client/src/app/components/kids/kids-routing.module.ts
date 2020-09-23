import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {KidsComponent} from './kids.component';
import {GamingComponent} from './gaming/gaming.component';
import {GamesComponent} from './gaming/games/games.component';

const routes: Routes = [
  { path: '', component: KidsComponent },
  { path: 'gaming', component: GamingComponent},
  { path: 'gaming/games', component: GamesComponent},
  // { path: 'gaming/games/snake', component: SnakeComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class KidsRoutingModule { }
