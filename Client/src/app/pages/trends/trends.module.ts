import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {TrendsListComponent} from "./trends-list.component";
import {TrendsRoutingModule} from "./trends-routing.module";


@NgModule({
  declarations: [
    TrendsListComponent
  ],

  imports: [
    CommonModule,
    TrendsRoutingModule,
    NbCardModule,
  ],

  providers: [],

})
export class TrendsModule {
}
