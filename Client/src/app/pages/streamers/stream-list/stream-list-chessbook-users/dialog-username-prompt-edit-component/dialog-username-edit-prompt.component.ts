import {Component, Input} from '@angular/core';
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

  isEdit = false;
  newUsername: string;

  handleEditClick() {
    this.newUsername = this.username;
    this.isEdit = true;
  }

  handleDeleteClick() {
    this.ref.close('action-delete');
  }

  edit() {
    this.ref.close(this.newUsername);
  }

  back() {
    this.isEdit = false;
  }

  dismiss() {
    this.ref.close();
  }
}
