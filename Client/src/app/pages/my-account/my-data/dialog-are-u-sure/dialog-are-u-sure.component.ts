import {Component, Input} from '@angular/core';
import {NbDialogRef} from "../../../../sharebook-nebular/theme/components/dialog/dialog-ref";

@Component({
  selector: 'app-dialog-are-u-sure',
  templateUrl: 'dialog-are-u-sure.component.html',
  styleUrls: ['dialog-are-u-sure.component.scss'],
})
export class DialogAreYouSureComponent {
  @Input() title: string;
  @Input() body: string;

  constructor(protected ref: NbDialogRef<DialogAreYouSureComponent>) {}

  dismiss(uSure: boolean = false) {
    this.ref.close(uSure);
  }
}
