import {NgModule} from '@angular/core';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {AboutRoutingModule} from './about-routing.module';
import {AboutComponent} from './about.component';
import {SharedMainModule} from "../shared/shared-main/shared-main.module";
import {SharedFormModule} from "../shared/shared-forms/shared-form.module";
import {AboutChessbookContributorsComponent} from "./about-chessbook/about-chessbook-contributors.component";
import {SharedCustomMarkupModule} from "../shared/shared-custom-markup";
import {NbButtonModule} from "../sharebook-nebular/theme/components/button/button.module";
import {NbCardModule} from "../sharebook-nebular/theme/components/card/card.module";
import {VideosDialogModule} from '../shared/videos/videos-dialog.module';
import {NbPopoverModule} from '../sharebook-nebular/theme/components/popover/popover.module';

@NgModule({
  imports: [
    AboutRoutingModule,

    SharedMainModule,
    SharedFormModule,
    FontAwesomeModule,
    SharedCustomMarkupModule,
    NbButtonModule,
    NbCardModule,
    VideosDialogModule,
    NbPopoverModule
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
  ]

})
export class AboutModule {
}
