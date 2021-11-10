import {NgModule} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {AboutRoutingModule} from './about-routing.module';
import {AboutComponent} from './about.component';
import {SharedMainModule} from "../shared/shared-main/shared-main.module";
import {SharedFormModule} from "../shared/shared-forms/shared-form.module";
import {AboutChessbookContributorsComponent} from "./about-chessbook/about-chessbook-contributors.component";
import {AboutInstanceResolver} from "./about-instance/about-instance.resolver";
import {SharedCustomMarkupModule} from "../shared/shared-custom-markup";
import {SharedInstanceModule} from "../shared/shared-instance/shared-instance.module";
import {NbButtonModule} from "../sharebook-nebular/theme/components/button/button.module";
import {NbCardModule} from "../sharebook-nebular/theme/components/card/card.module";

@NgModule({
  imports: [
    AboutRoutingModule,

    SharedMainModule,
    SharedFormModule,
    FontAwesomeModule,
    SharedCustomMarkupModule,
    SharedInstanceModule,
    NbButtonModule,
    NbCardModule,
  ],

  declarations: [
    AboutComponent,
    AboutChessbookContributorsComponent,
  ],

  exports: [
    AboutComponent,
    SharedCustomMarkupModule,
  ],

  providers: [
    AboutInstanceResolver
  ]
})
export class AboutModule {
}
