import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../core/shared-core/shared.module';
import {ViewComponent} from './view/view.component';
import {GamingComponent} from './gaming/gaming.component';
import {GamesComponent} from './gaming/games/games.component';
import {KidsRoutingModule} from './kids-routing.module';


@NgModule({
  declarations: [
    ViewComponent, GamingComponent, GamesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    KidsRoutingModule,
  ],
  exports: [
    ViewComponent,
    GamingComponent,
    GamesComponent,
  ],
  providers: []
})

export class KidsModule {}
