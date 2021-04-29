import {Component, Input, Optional} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {StreamersService} from "../../streamers.service";

@Component({
  selector: 'app-dialog-name-edit-prompt',
  templateUrl: 'dialog-username-edit-prompt.component.html',
  styleUrls: ['dialog-username-edit-prompt.component.scss'],
})
export class DialogUsernameEditPromptComponent {
  @Input() title: string;
  @Input() body: string;
  @Input() username: string;

  constructor(@Optional()  protected ref: NbDialogRef<DialogUsernameEditPromptComponent>) {}

  dismiss() {
    this.ref.close();
  }

  edit() {
    debugger
    this.ref.close(this.newUsername);
  }

  isEdit = false;
  newUsername: string;

  handleEditClick() {
    this.newUsername = this.username;
    this.isEdit = true;
  }
}
