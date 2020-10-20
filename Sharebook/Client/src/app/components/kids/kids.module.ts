import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {KidsComponent} from './kids.component';
import {GamingComponent} from './gaming/gaming.component';
import {GamesComponent} from './gaming/games/games.component';
import {KidsRoutingModule} from './kids-routing.module';


@NgModule({
  declarations: [
    KidsComponent, GamingComponent, GamesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    KidsRoutingModule,
  ],
  exports: [
    KidsComponent,
    GamingComponent,
    GamesComponent,
  ],
  providers: []
})

export class KidsModule {}
