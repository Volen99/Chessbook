import { NgModule } from '@angular/core';

import { SearchService } from '../shared/shared-search/search.service';
import { SharedMainModule } from '../shared/shared-main';
import { SettingsRoutingModule } from './settings-routing.module';
import { YourAccountComponent } from './your-account/your-account.component';
import { SettingsComponent } from './settings.component';
import { SharedGlobalIconModule } from '../shared/shared-icons/shared-global-icon.module';
import { AccessibilityDisplayAndLanguagesComponent } from './accessibility-display-and-languages/accessibility-display-and-languages.component';
import { SecurityAndAccountAccessSecurityComponent } from './security-and-account-access-security/security-and-account-access-security.component';
import { PrivacyAndSafetyComponent } from './privacy-and-safety/privacy-and-safety.component';
import { SettingsNotificationsComponent } from './settings-notifications/settings-notifications.component';
import { AdditionalResourcesComponent } from './additional-resources/additional-resources.component';

@NgModule({
  imports: [
    SharedMainModule,

    SettingsRoutingModule,
    SharedGlobalIconModule,

  ],

  declarations: [
    SettingsComponent,
    YourAccountComponent,
    AccessibilityDisplayAndLanguagesComponent,
    SecurityAndAccountAccessSecurityComponent,
    PrivacyAndSafetyComponent,
    SettingsNotificationsComponent,
    AdditionalResourcesComponent,
  ],

  exports: [
  ],

  providers: [
    SearchService,
  ]
})
export class SettingsModule {
}
