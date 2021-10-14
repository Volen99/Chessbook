import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TermsRoutingModule} from "./terms-routing.module";
import {TermsComponent} from "./terms.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
   TermsComponent
  ],

  imports: [
    CommonModule,
    TermsRoutingModule,
    FontAwesomeModule,
  ],

  providers: [
  ],
})
export class TermsModule {
}
