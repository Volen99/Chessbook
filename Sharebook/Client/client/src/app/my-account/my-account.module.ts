import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { MyAccountAbusesListComponent } from './my-account-abuses/my-account-abuses-list.component';
import { MyAccountBlocklistComponent } from './my-account-blocklist/my-account-blocklist.component';
import { MyAccountServerBlocklistComponent } from './my-account-blocklist/my-account-server-blocklist.component';
import { MyAccountNotificationsComponent } from './my-account-notifications/my-account-notifications.component';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountChangeEmailComponent } from './my-account-settings/my-account-change-email';
import { MyAccountChangePasswordComponent } from './my-account-settings/my-account-change-password/my-account-change-password.component';
import { MyAccountDangerZoneComponent } from './my-account-settings/my-account-danger-zone';
import { MyAccountNotificationPreferencesComponent } from './my-account-settings/my-account-notification-preferences';
import { MyAccountProfileComponent } from './my-account-settings/my-account-profile/my-account-profile.component';
import { MyAccountSettingsComponent } from './my-account-settings/my-account-settings.component';
import { MyAccountApplicationsComponent } from './my-account-applications/my-account-applications.component';
import { MyAccountComponent } from './my-account.component';
import { SharedMainModule } from '../shared/shared-main';
import { SharedModerationModule } from '../shared/shared-moderation';
import { SharedUserInterfaceSettingsModule } from '../shared/shared-user-settings';
import { SharedShareModal } from '../shared/shared-share-modal';
import { SharedAbuseListModule } from '../shared/shared-abuse-list/shared-abuse-list.module';
import { SharedFormModule } from '../shared/shared-forms/shared-form.module';
import { SharedGlobalIconModule } from '../shared/shared-icons/shared-global-icon.module';

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
    SharedShareModal,
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
