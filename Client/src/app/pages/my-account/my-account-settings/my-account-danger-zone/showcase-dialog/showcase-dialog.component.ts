import {Component, Input} from '@angular/core';

import {NbDialogRef} from "../../../../../sharebook-nebular/theme/components/dialog/dialog-ref";
import {UsersService} from "../../../../../core/backend/common/services/users.service";
import {NbToastrService} from "../../../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {RedirectService} from "../../../../../core/routing/redirect.service";

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent {
  @Input() title: string;
  @Input() body: string;
  @Input() screenName: string;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>, private userService: UsersService,
              private toastrService: NbToastrService, private redirectService: RedirectService) {
  }

  inputValue = '';

  dismiss() {
    this.ref.close();
  }

  submit() {
    this.userService.deleteMe().subscribe(
      () => {
        this.toastrService.success(`Your account is deleted.`);

        this.ref.close(this.screenName);
        this.redirectService.redirectToLogout();
      },

      err => this.toastrService.danger(err.message)
    );

    this.ref.close(this.screenName);
  }

  isConfirmationDisabled() {
    // No input validation
    if (!this.screenName) {
      return false;
    }

    return this.screenName !== this.inputValue;
  }
}
