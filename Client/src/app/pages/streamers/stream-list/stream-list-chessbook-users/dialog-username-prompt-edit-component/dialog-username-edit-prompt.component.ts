import {Component, Input, OnInit, Optional} from '@angular/core';
import {StreamersService} from "../../../streamers.service";
import {NbDialogRef} from "../../../../../sharebook-nebular/theme/components/dialog/dialog-ref";

@Component({
  selector: 'app-dialog-name-edit-prompt',
  templateUrl: 'dialog-username-edit-prompt.component.html',
  styleUrls: ['dialog-username-edit-prompt.component.scss'],
})
export class DialogUsernameEditPromptComponent {
  @Input() title: string;
  @Input() body: string;
  @Input() username: string;

  constructor(protected ref: NbDialogRef<DialogUsernameEditPromptComponent>) {
  }

  dismiss() {
    this.ref.close();
  }

  edit() {
    this.ref.close(this.newUsername);
  }

  back() {
    this.isEdit = false;
  }

  isEdit = false;
  newUsername: string;

  handleEditClick() {
    this.newUsername = this.username;
    this.isEdit = true;
  }

  handleDeleteClick() {
    this.ref.close('action-delete');
  }
}
