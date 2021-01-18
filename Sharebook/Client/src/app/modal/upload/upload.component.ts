import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

import {WhoCanReplyComponent} from "./who-can-reply/who-can-reply.component";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  private readonly defaultTweetBtnClassName = 'r-urgr8i';
  private readonly hoveredTweetBtnClassName = 'r-1q3imqu';

  private dialog: MatDialog;

  constructor(dialog: MatDialog) {
    this.dialog = dialog;
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    // this.uploader = new FileUploader({
    //   url: '',
    //   disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
    //   formatDataFunctionIsAsync: true,
    //   formatDataFunction: async (item) => {
    //     return new Promise((resolve, reject) => {
    //       resolve({
    //         name: item._file.name,
    //         length: item._file.size,
    //         contentType: item._file.type,
    //         date: new Date()
    //       });
    //     });
    //   }
    // });

    this.response = '';


    // this.uploader.response.subscribe(res => this.response = res);
  }

  ngOnInit(): void {
    // if (isOpen === false) {
    //   this.helpVisible = false;
    // } else {
    //   this.toggleHelpVisible();
    // }
  }

  ngOnDestroy(): void {
  }


  public helpVisible = false;

  // public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean;
  public hasAnotherDropZoneOver: boolean;
  public response: string;



  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public rurgr8iOrR1q3imqu = this.defaultTweetBtnClassName;

  public async tweetBtnMouseEnter(event: MouseEvent) {
    this.changeTweetBtnBackgroundColorClassName();
  }

  public async tweetBtnMouseLeave(event: MouseEvent) {
  }

  public openDialog() {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;

      this.dialog.open(WhoCanReplyComponent, dialogConfig);
  }

  private changeTweetBtnBackgroundColorClassName(): void {
    if (this.rurgr8iOrR1q3imqu === this.defaultTweetBtnClassName) {
      this.rurgr8iOrR1q3imqu = this.hoveredTweetBtnClassName;
    } else {
      this.rurgr8iOrR1q3imqu = this.defaultTweetBtnClassName;
    }
  }

  public toggleHelpVisible(): void {
    this.helpVisible = !this.helpVisible;
  }


}
