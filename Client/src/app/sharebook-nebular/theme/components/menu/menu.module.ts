import { NgModule, ModuleWithProviders } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbMenuComponent, NbMenuItemComponent } from './menu.component';
import { NbMenuService, NbMenuInternalService } from './menu.service';
import { NbIconModule } from '../icon/icon.module';
import { NbBadgeModule } from '../badge/badge.module';
import {NotificationComponent} from "./notification.component";
import {NgbPopoverModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

const nbMenuComponents = [NbMenuComponent, NbMenuItemComponent];

const NB_MENU_PROVIDERS = [NbMenuService, NbMenuInternalService];

@NgModule({
  imports: [
    NbSharedModule,
    NbIconModule,
    NbBadgeModule,
    NgbPopoverModule,
    FontAwesomeModule,
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
