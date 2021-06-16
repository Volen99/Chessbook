import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedActorImageModule} from '../shared-actor-image/shared-actor-image.module';
import {CustomMarkupContainerComponent} from './custom-markup-container.component';
import {CustomMarkupHelpComponent} from './custom-markup-help.component';
import {CustomMarkupService} from './custom-markup.service';
import {DynamicElementService} from './dynamic-element.service';
import {SharedMainModule} from "../shared-main/shared-main.module";

@NgModule({
  imports: [
    CommonModule,

    SharedMainModule,
    SharedActorImageModule
  ],

  declarations: [
    CustomMarkupHelpComponent,
    CustomMarkupContainerComponent,
  ],

  exports: [
    CustomMarkupHelpComponent,
    CustomMarkupContainerComponent,
  ],

  providers: [
    CustomMarkupService,
    DynamicElementService
  ]
})
export class SharedCustomMarkupModule {
}
