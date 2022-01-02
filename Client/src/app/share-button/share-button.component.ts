import {Component, Input, OnInit} from '@angular/core';

import {NbDialogService} from "../sharebook-nebular/theme/components/dialog/dialog.service";
import {UploadComponent} from "../pages/modal-overlays/dialog/compose/upload/upload.component";
import {UserStore} from "../core/stores/user.store";
import {NbToastrService} from "../sharebook-nebular/theme/components/toastr/toastr.service";

import {
  faComet,
} from '@fortawesome/pro-light-svg-icons';

import {
  faComet as faCometSolid
} from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: [ './share-button.component.scss' ]
})
export class ShareButtonComponent implements OnInit {
  @Input() type: string;

  constructor (private dialogService: NbDialogService, private userStore: UserStore,
               private notifier: NbToastrService) {
  }

  ngOnInit (): void {
  }

  isShareOpen = false;

  open() {
    if (!this.userStore.isLoggedIn()) {
      this.notifier.warning('', 'You need to be logged in to post');
      return;
    }

    this.isShareOpen = true;
    this.dialogService.open(UploadComponent, {
      context: {
      },
      closeOnEsc: false,
    })
        .onClose.subscribe(() => {
          this.isShareOpen = false;
    });
  }

  faComet = faComet;
  faCometSolid = faCometSolid;

}
