/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule, ModuleWithProviders } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbMenuComponent, NbMenuItemComponent } from './menu.component';
import { NbMenuService, NbMenuInternalService } from './menu.service';
import { NbIconModule } from '../icon/icon.module';
import { NbBadgeModule } from '../badge/badge.module';

import {NotificationComponent} from "./notification.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbPopoverModule} from "@ng-bootstrap/ng-bootstrap";

const nbMenuComponents = [NbMenuComponent, NbMenuItemComponent];

const NB_MENU_PROVIDERS = [NbMenuService, NbMenuInternalService];

@NgModule({
  imports: [
    NbSharedModule,
    NbIconModule,
    NbBadgeModule,
    FontAwesomeModule,
    NgbPopoverModule,
  ],
  declarations: [...nbMenuComponents, NotificationComponent],
  exports: [...nbMenuComponents],
})
export class NbMenuModule {
  static forRoot(): ModuleWithProviders<NbMenuModule> {
    return {
      ngModule: NbMenuModule,
      providers: [
        ...NB_MENU_PROVIDERS,
      ],
    };
  }
}
