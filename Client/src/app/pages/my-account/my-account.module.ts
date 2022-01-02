import {NgModule} from '@angular/core';
import {TableModule} from 'primeng/table';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {MyAccountBlocklistComponent} from './my-account-blocklist/my-account-blocklist.component';
import {MyAccountRoutingModule} from './my-account-routing.module';
import {MyAccountChangePasswordComponent} from './my-account-settings/my-account-change-password/my-account-change-password.component';
import {MyAccountProfileComponent} from './my-account-settings/my-account-profile/my-account-profile.component';
import {MyAccountSettingsComponent} from './my-account-settings/my-account-settings.component';
import {MyAccountComponent} from './my-account.component';
import {NbTabsetModule} from "../../sharebook-nebular/theme/components/tabset/tabset.module";
import {NbRouteTabsetModule} from "../../sharebook-nebular/theme/components/route-tabset/route-tabset.module";
import {SharedMainModule} from "../../shared/shared-main/shared-main.module";
import {SharedModerationModule} from "../../shared/shared-moderation/shared-moderation.module";
import {SharedAbuseListModule} from "../../shared/shared-abuse-list/shared-abuse-list.module";
import {SharedFormModule} from "../../shared/shared-forms/shared-form.module";
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
import {NbRadioModule} from "../../sharebook-nebular/theme/components/radio/radio.module";
import {SharedActorImageEditModule} from "../../shared/shared-actor-image-edit/shared-actor-image-edit.module";
import {SharedActorImageModule} from "../../shared/shared-actor-image/shared-actor-image.module";
import { MyDataComponent } from './my-data/my-data.component';
import {DialogAreYouSureComponent} from "./my-data/dialog-are-u-sure/dialog-are-u-sure.component";
import {ShowcaseDialogComponent} from './my-account-settings/my-account-danger-zone/showcase-dialog/showcase-dialog.component';

@NgModule({
  imports: [
    MyAccountRoutingModule,

    TableModule,

    SharedMainModule,
    SharedFormModule,
    SharedModerationModule,
    SharedAbuseListModule,
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
    SharedActorImageEditModule,
    SharedActorImageModule,
  ],

  declarations: [
    MyAccountComponent,
    MyAccountSettingsComponent,
    MyAccountChangePasswordComponent,
    MyAccountProfileComponent,
    MyAccountChangeEmailComponent,

    MyAccountDangerZoneComponent,
    MyAccountBlocklistComponent,
    MyAccountNotificationPreferencesComponent,
    MyAccountThemeComponent,
    DialogAreYouSureComponent,
    MyDataComponent,
    ShowcaseDialogComponent,
  ],

  exports: [
    MyAccountComponent
  ],

  providers: []
})
export class MyAccountModule {
}
