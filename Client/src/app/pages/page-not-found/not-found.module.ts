import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {NotFoundComponent} from './not-found.component';
import {NotFoundRoutingModule} from './not-found-routing.module';
import {NbCardModule} from '../../sharebook-nebular/theme/components/card/card.module';
import {NbButtonModule} from '../../sharebook-nebular/theme/components/button/button.module';

@NgModule({
  imports: [
    CommonModule,

    NotFoundRoutingModule,
    NbCardModule,
    NbButtonModule
  ],

  declarations: [
    NotFoundComponent
  ],

  exports: [
    NotFoundComponent
  ],

  providers: []
})
export class NotFoundModule { }
