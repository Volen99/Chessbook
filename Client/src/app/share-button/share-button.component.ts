import { Component, OnInit } from '@angular/core';

import {NbDialogService} from "../sharebook-nebular/theme/components/dialog/dialog.service";
import {UploadComponent} from "../pages/modal-overlays/dialog/compose/upload/upload.component";
import {UserStore} from "../core/stores/user.store";
import {NbToastrService} from "../sharebook-nebular/theme/components/toastr/toastr.service";

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: [ './share-button.component.scss' ]
})
export class ShareButtonComponent implements OnInit {

  constructor (private dialogService: NbDialogService, private userStore: UserStore,
               private notifier: NbToastrService) {
  }

  ngOnInit (): void {
  }

  open() {
    if (!this.userStore.isLoggedIn()) {
      this.notifier.warning('', 'You need to be logged in order to post');
      return;
    }

    this.dialogService.open(UploadComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }

}
