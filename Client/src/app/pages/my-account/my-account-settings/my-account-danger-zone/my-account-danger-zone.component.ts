import {Component, Input, OnInit} from '@angular/core';
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
export class MyAccountDangerZoneComponent implements OnInit {
  @Input() screenName: string;

  constructor(
    private authService: AuthService,
    private notifier: Notifier,
    private userService: UsersService,
    private confirmService: ConfirmService,
    private redirectService: RedirectService,
    private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    if (this.screenName) {
      this.screenName = this.screenName.substring(1);
    }
  }

  async deleteMe() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'Delete your account',
        body: 'Are you sure you want to delete your account? This will delete all your data, including account, posts, shares, replies and any stalemate tricks left. You are resigning the game.',
        screenName: this.screenName,
      },
      closeOnEsc: true,
    });
  }
}
