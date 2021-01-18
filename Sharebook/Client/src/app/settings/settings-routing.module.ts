import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { YourAccountComponent } from './your-account/your-account.component';
import { SettingsComponent } from './settings.component';
import { AccessibilityDisplayAndLanguagesComponent } from './accessibility-display-and-languages/accessibility-display-and-languages.component';
import { SecurityAndAccountAccessSecurityComponent } from './security-and-account-access-security/security-and-account-access-security.component';
import { PrivacyAndSafetyComponent } from './privacy-and-safety/privacy-and-safety.component';
import { SettingsNotificationsComponent } from './settings-notifications/settings-notifications.component';
import { AdditionalResourcesComponent } from './additional-resources/additional-resources.component';

const searchRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'account',
        component: YourAccountComponent,
      },
      {
        path: 'accessibility_display_and_languages',
        component: AccessibilityDisplayAndLanguagesComponent,
      },
      {
        path: 'security_and_account_access',
        component: SecurityAndAccountAccessSecurityComponent,
      },
      {
        path: 'privacy_and_safety',
        component: PrivacyAndSafetyComponent,
      },
      {
        path: 'notifications',
        component: SettingsNotificationsComponent,
      },
      {
        path: 'about',
        component: AdditionalResourcesComponent,
      },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(searchRoutes) ],
  exports: [ RouterModule ]
})
export class SettingsRoutingModule {
}
