import { Component } from '@angular/core';
import {NbDialogRef} from "../../../../../sharebook-nebular/theme/components/dialog/dialog-ref";

@Component({
  selector: 'app-dialog-username-prompt',
  templateUrl: './dialog-username-prompt.component.html',
  styleUrls: ['./dialog-username-prompt.component.scss']
})
export class DialogUsernamePromptComponent {

  constructor(protected ref: NbDialogRef<DialogUsernamePromptComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }

}
