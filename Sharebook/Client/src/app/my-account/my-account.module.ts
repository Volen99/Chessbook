import {NgModule} from '@angular/core';
import {MyAccountAbusesListComponent} from './my-account-abuses/my-account-abuses-list.component';
import {MyAccountBlocklistComponent} from './my-account-blocklist/my-account-blocklist.component';
import {MyAccountServerBlocklistComponent} from './my-account-blocklist/my-account-server-blocklist.component';
import {MyAccountNotificationsComponent} from './my-account-notifications/my-account-notifications.component';
import {MyAccountRoutingModule} from './my-account-routing.module';
import {MyAccountSettingsComponent} from './my-account-settings/my-account-settings.component';
import {MyAccountApplicationsComponent} from './my-account-applications/my-account-applications.component';
import {MyAccountComponent} from './my-account.component';
import {SharedShareModal} from "../shared/shared-share-modal/shared-share-modal.module";
import {SharedGlobalIconModule} from "../shared/shared-icons/shared-global-icon.module";
import {SharedUserInterfaceSettingsModule} from "../shared/user-settings";
import {SharedModerationModule} from "../shared/shared-moderation/shared-moderation.module";
import {SharedFormModule} from "../shared/shared-forms/shared-form.module";
import {SharedMainModule} from "../shared/main/shared-main.module";
import {MyAccountChangePasswordComponent} from "./my-account-settings/my-account-change-password/my-account-change-password.component";
import {MyAccountProfileComponent} from "./my-account-settings/my-account-profile/my-account-profile.component";
import {MyAccountChangeEmailComponent} from "./my-account-settings/my-account-change-email/my-account-change-email.component";
import {MyAccountDangerZoneComponent} from "./my-account-settings/my-account-danger-zone/my-account-danger-zone.component";
import {MyAccountNotificationPreferencesComponent} from "./my-account-settings/my-account-notification-preferences/my-account-notification-preferences.component";
import {AutoCompleteModule} from "primeng/autocomplete";
import {TableModule} from "primeng/table";
import {DragDropModule} from "primeng/dragdrop";
import {SharedAbuseListModule} from "../shared/abuse-list/shared-abuse-list.module";

@NgModule({
  imports: [
    MyAccountRoutingModule,

    AutoCompleteModule,
    TableModule,
    DragDropModule,

    SharedMainModule,
    SharedFormModule,
    SharedModerationModule,
    SharedUserInterfaceSettingsModule,
    SharedGlobalIconModule,
    SharedAbuseListModule,
    SharedShareModal
  ],

  declarations: [
    MyAccountComponent,
    MyAccountSettingsComponent,
    MyAccountChangePasswordComponent,
    MyAccountProfileComponent,
    MyAccountChangeEmailComponent,
    MyAccountApplicationsComponent,

    MyAccountDangerZoneComponent,
    MyAccountBlocklistComponent,
    MyAccountAbusesListComponent,
    MyAccountServerBlocklistComponent,
    MyAccountNotificationsComponent,
    MyAccountNotificationPreferencesComponent
  ],

  exports: [
    MyAccountComponent
  ],

  providers: []
})
export class MyAccountModule {
}
