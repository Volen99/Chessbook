import {Component, Input} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'dialog-username-prompt.component.html',
  styleUrls: ['dialog-username-prompt.component.scss'],
})
export class DialogUsernamePromptComponent {
  @Input() title: string;
  @Input() body: string;

  constructor(protected ref: NbDialogRef<DialogUsernamePromptComponent>) {}

  dismiss() {
    this.ref.close();
  }
}
