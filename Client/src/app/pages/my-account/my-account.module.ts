import {AutoCompleteModule} from 'primeng/autocomplete';
import {TableModule} from 'primeng/table';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgModule} from '@angular/core';
import {MyAccountAbusesListComponent} from './my-account-abuses/my-account-abuses-list.component';
import {MyAccountBlocklistComponent} from './my-account-blocklist/my-account-blocklist.component';
import {MyAccountServerBlocklistComponent} from './my-account-blocklist/my-account-server-blocklist.component';
import {MyAccountNotificationsComponent} from './my-account-notifications/my-account-notifications.component';
import {MyAccountRoutingModule} from './my-account-routing.module';
import {MyAccountChangePasswordComponent} from './my-account-settings/my-account-change-password/my-account-change-password.component';
import {MyAccountProfileComponent} from './my-account-settings/my-account-profile/my-account-profile.component';
import {MyAccountSettingsComponent} from './my-account-settings/my-account-settings.component';
import {MyAccountComponent} from './my-account.component';
import {NbTabsetModule} from "../../sharebook-nebular/theme/components/tabset/tabset.module";
import {NbRouteTabsetModule} from "../../sharebook-nebular/theme/components/route-tabset/route-tabset.module";
import {SharedMainModule} from "../../shared/shared-main/shared-main.module";
import {SharedModerationModule} from "../../shared/moderation/shared-moderation.module";
import {SharedGlobalIconModule} from "../../shared/shared-icons/shared-global-icon.module";
import {SharedAbuseListModule} from "../../shared/shared-abuse-list/shared-abuse-list.module";
import {SharedFormModule} from "../../shared/forms/shared-form.module";
import {MyAccountChangeEmailComponent} from "./my-account-settings/my-account-change-email/my-account-change-email.component";
import {MyAccountDangerZoneComponent} from "./my-account-settings/my-account-danger-zone/my-account-danger-zone.component";
import {MyAccountNotificationPreferencesComponent} from "./my-account-settings/my-account-notification-preferences/my-account-notification-preferences.component";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {ComponentsModule} from "../../components/components.module";
import {NbInputModule} from "../../sharebook-nebular/theme/components/input/input.module";
import {NbButtonModule} from "../../sharebook-nebular/theme/components/button/button.module";
import {NbToggleModule} from "../../sharebook-nebular/theme/components/toggle/toggle.module";
import { MyAccountThemeComponent } from './my-account-settings/my-account-theme/my-account-theme.component';
import {NbSelectModule} from "../../sharebook-nebular/theme/components/select/select.module";
import {AuthModule} from "../../auth/auth.module";
import {DialogUsernamePromptComponent} from "./my-account-settings/my-account-danger-zone/dialog-username-prompt/dialog-username-prompt.component";
import { MyAccountPersonalDetailsComponent } from './my-account-settings/my-account-personal-details/my-account-personal-details.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NbRadioModule} from "../../sharebook-nebular/theme/components/radio/radio.module";

@NgModule({
  imports: [
    MyAccountRoutingModule,

    AutoCompleteModule,
    TableModule,
    DragDropModule,

    SharedMainModule,
    SharedFormModule,
    SharedModerationModule,
    // SharedUserInterfaceSettingsModule,
    SharedGlobalIconModule,
    SharedAbuseListModule,
    // SharedShareModal,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbCardModule,
    ComponentsModule,
    NbInputModule,
    NbButtonModule,
    NbToggleModule,
    NbSelectModule,
    AuthModule,
    FontAwesomeModule,
    NbRadioModule,
  ],

  declarations: [
    MyAccountComponent,
    MyAccountSettingsComponent,
    MyAccountChangePasswordComponent,
    MyAccountProfileComponent,
    MyAccountChangeEmailComponent,
    // MyAccountApplicationsComponent,

    MyAccountDangerZoneComponent,
    MyAccountBlocklistComponent,
    MyAccountAbusesListComponent,
    MyAccountServerBlocklistComponent,
    MyAccountNotificationsComponent,
    MyAccountNotificationPreferencesComponent,
    MyAccountThemeComponent,
    DialogUsernamePromptComponent,
    MyAccountPersonalDetailsComponent,
  ],

  exports: [
    MyAccountComponent
  ],

  providers: []
})
export class MyAccountModule {
}
