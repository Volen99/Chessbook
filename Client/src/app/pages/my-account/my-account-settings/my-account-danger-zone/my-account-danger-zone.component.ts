import {Component, Input, OnInit} from '@angular/core';

import {ConfirmService} from "../../../../core/confirm/confirm.service";
import {UsersService} from "../../../../core/backend/common/services/users.service";
import {RedirectService} from "../../../../core/routing/redirect.service";
import {NbDialogService} from "../../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {ShowcaseDialogComponent} from "./showcase-dialog/showcase-dialog.component";
import {NbToastrService} from '../../../../sharebook-nebular/theme/components/toastr/toastr.service';

@Component({
  selector: 'my-account-danger-zone',
  templateUrl: './my-account-danger-zone.component.html',
  styleUrls: ['./my-account-danger-zone.component.scss']
})
export class MyAccountDangerZoneComponent implements OnInit {
  @Input() screenName: string;

  constructor(
    private notifier: NbToastrService,
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
