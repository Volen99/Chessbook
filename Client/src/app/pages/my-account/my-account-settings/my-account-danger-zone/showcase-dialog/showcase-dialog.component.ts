import {Component, Input} from '@angular/core';

import {NbDialogRef} from "../../../../../sharebook-nebular/theme/components/dialog/dialog-ref";
import {NbToastrService} from "../../../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {RedirectService} from "../../../../../core/routing/redirect.service";
import {GdprService} from "../../../../../shared/services/gdpr.service";
import {UserStore} from "../../../../../core/stores/user.store";

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
  providers: [GdprService],
})
export class ShowcaseDialogComponent {
  @Input() title: string;
  @Input() body: string;
  @Input() screenName: string;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>, private gdprService: GdprService,
              private toastrService: NbToastrService, private redirectService: RedirectService,
              private userStore: UserStore) {
  }

  inputValue = '';

  dismiss() {
    this.ref.close();
  }

  submit() {
    this.gdprService.delete(this.userStore.getUser().id).subscribe(
      () => {
        this.toastrService.success('Godspeed my friend! I hope our paths cross again :)');
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
