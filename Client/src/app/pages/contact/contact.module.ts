import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ContactComponent} from "./contact.component";
import {ContactRoutingModule} from "./contact-routing.module";
import {SharedMainModule} from "../../shared/shared-main/shared-main.module";
import {SharedFormModule} from "../../shared/shared-forms/shared-form.module";
import {ContactService} from "./contact.service";
import {NbButtonModule} from "../../sharebook-nebular/theme/components/button/button.module";
import {NbInputModule} from "../../sharebook-nebular/theme/components/input/input.module";
import {ComponentsModule} from "../../components/components.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
   ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,

    SharedMainModule,
    SharedFormModule,
    NbButtonModule,
    NbInputModule,
    ComponentsModule,
    FontAwesomeModule,
  ],
  providers: [
    ContactService,
  ],
})
export class ContactModule {
}
