import {Component, Input} from '@angular/core';
import {User} from "../../../../shared/shared-main/user/user.model";
import {AuthService} from "../../../../core/auth/auth.service";
import {Notifier} from "../../../../core/notification/notifier.service";
import {ConfirmService} from "../../../../core/confirm/confirm.service";
import {UsersService} from "../../../../core/backend/common/services/users.service";
import {RedirectService} from "../../../../core/routing/redirect.service";
import {IUser} from "../../../../core/interfaces/common/users";
import {DialogUsernamePromptComponent} from "./dialog-username-prompt/dialog-username-prompt.component";
import {NbDialogService} from "../../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {ShowcaseDialogComponent} from "../../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";

@Component({
  selector: 'my-account-danger-zone',
  templateUrl: './my-account-danger-zone.component.html',
  styleUrls: ['./my-account-danger-zone.component.scss']
})
export class MyAccountDangerZoneComponent {
  @Input() user: IUser = null;

  constructor(
    private authService: AuthService,
    private notifier: Notifier,
    private userService: UsersService,
    private confirmService: ConfirmService,
    private redirectService: RedirectService,
    private dialogService: NbDialogService) {
  }

  async deleteMe() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'Delete your account',
        body: 'Are you sure you want to delete your account? This will delete all your data, including channels, videos and comments. Content cached by other servers and other third-parties might make longer to be deleted.',
        username: this.user.screenName,
      },
      closeOnEsc: true,
    });

    //
    // const res = await this.confirmService.confirmWithInput(
    //   `Are you sure you want to delete your account? This will delete all your data, including channels, videos and comments. Content cached by other servers and other third-parties might make longer to be deleted.`,
    //   `Type your username to confirm`,
    //   this.user.screenName,
    //   `Delete your account`,
    //   `Delete my account`
    // );
    // if (res === false) {
    //   return;
    // }
    //
    // this.userService.deleteMe().subscribe(
    //   () => {
    //     this.notifier.success(`Your account is deleted.`);
    //
    //     this.authService.logout();
    //     this.redirectService.redirectToHomepage();
    //   },
    //
    //   err => this.notifier.error(err.message)
    // );
  }
}
