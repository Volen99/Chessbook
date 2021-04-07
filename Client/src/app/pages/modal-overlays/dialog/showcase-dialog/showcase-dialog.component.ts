import { Component, Input } from '@angular/core';
import {NbDialogRef} from "../../../../sharebook-nebular/theme/components/dialog/dialog-ref";

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent {

  @Input() title: string;
  @Input() body: string;
  @Input() username: string;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>) {}

  dismiss() {
    this.ref.close();
  }

  submit(username: string) {
    if (this.username !== username) {
      return;
    }

    this.ref.close(username);
  }
}
