import { Component, OnInit } from '@angular/core';

import {NbDialogService} from "../sharebook-nebular/theme/components/dialog/dialog.service";
import {UploadComponent} from "../pages/modal-overlays/dialog/compose/upload/upload.component";

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: [ './share-button.component.scss' ]
})
export class ShareButtonComponent implements OnInit {

  constructor (private dialogService: NbDialogService) {
  }

  ngOnInit (): void {
  }

  open() {
    this.dialogService.open(UploadComponent, { // ShowcaseDialogComponent
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }

}
