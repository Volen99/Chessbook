import {Component, OnInit} from '@angular/core';
import {saveAs} from 'file-saver';

import {
  faDownload,
  faTrashAlt,
} from '@fortawesome/pro-light-svg-icons';

import {GdprService} from "../../../shared/services/gdpr.service";
import {NbDialogService} from "../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {DialogAreYouSureComponent} from "./dialog-are-u-sure/dialog-are-u-sure.component";

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss'],
  providers: [GdprService]
})
export class MyDataComponent implements OnInit {

  constructor(private gdprService: GdprService, private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
  }

  faDownload = faDownload;
  faTrashAlt = faTrashAlt;

  handleExport() {
    this.gdprService.export()
      .subscribe((data) => {
        saveAs(data.body, 'userData.xlsx'); // let blob = new Blob([data.body], {type: "application/octet-stream"});
      });
  }

  handleDelete() {
    this.dialogService.open(DialogAreYouSureComponent, {
      context: {
        title: 'Are you sure?',
        body: 'You will never be able to recover this account.'
      },
      closeOnEsc: false,
      closeOnBackdropClick: true,
    })
      .onClose.subscribe(uSure => {
      if (uSure) {
        this.gdprService.delete()
          .subscribe((data) => {
          });
      }
    });

  }

}
