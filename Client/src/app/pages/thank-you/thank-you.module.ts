import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ThankYouRoutingModule} from './thank-you-routing.module';
import {ThankYouComponent} from './thank-you.component';
import {NbCardModule} from '../../sharebook-nebular/theme/components/card/card.module';

@NgModule({
  declarations: [
    ThankYouComponent,
  ],

  imports: [
    CommonModule,
    ThankYouRoutingModule,
    NbCardModule,
  ],

  providers: [],

})
export class ThankYouModule {
}
