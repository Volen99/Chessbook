import {NgModule} from '@angular/core';

import {SharedMainModule} from '../shared-main/shared-main.module';
import {VideoShareComponent} from './video-share.component';
import {SharedFormModule} from "../shared-forms/shared-form.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";

@NgModule({
  imports: [
    SharedMainModule,
    SharedFormModule,
    FontAwesomeModule,
    NbCardModule,
  ],

  declarations: [
    VideoShareComponent
  ],

  exports: [
    VideoShareComponent
  ],

  providers: []
})
export class SharedShareModal {
}
