import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {FileUploader} from "./file-uploader.class";
import {UploadService} from "./upload.service";
import {PostsService} from "../../shared/posts/posts.service";
import {PublishTweetParameters} from "../../shared/posts/parameters/publish-tweet-parameters";
import {PlatformLocation} from "@angular/common";          // I am back!! 💙 06.11.2020, Friday
// import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
//
// import {WhoCanReplyComponent} from "./who-can-reply/who-can-reply.component";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  private readonly defaultTweetBtnClassName = 'r-urgr8i';
  private readonly hoveredTweetBtnClassName = 'r-1q3imqu';

  private dialog: any; // MatDialog;

  constructor(/*dialog: MatDialog*/ private uploadService: UploadService,
              private postsService: PostsService, private location: PlatformLocation) {
    // this.dialog = dialog;
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.uploader = new FileUploader({
      url: '',
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      autoUpload: true,
      formatDataFunction: async (item) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });
  }

  ngOnInit(): void {
    // if (isOpen === false) {
    //   this.helpVisible = false;
    // } else {
    //   this.toggleHelpVisible();
    // }

    this.response = '';


    this.uploader.response.subscribe(res => {
      this.response = res;
    });
  }

  ngOnDestroy(): void {
  }


  public helpVisible = true;

  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean;
  public hasAnotherDropZoneOver: boolean;
  public response: string;


  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public async fileDrop(files: File[]) {

  }

  public rurgr8iOrR1q3imqu = this.defaultTweetBtnClassName;

  public async tweetBtnMouseEnter(event: MouseEvent) {
    this.changeTweetBtnBackgroundColorClassName();
  }

  public async tweetBtnMouseLeave(event: MouseEvent) {
  }



  public isCloseIconHovered = false;

  handleCloseIconHover(event: MouseEvent) {
    this.isCloseIconHovered = !this.isCloseIconHovered;
  }



  public openDialog() {
    // const dialogConfig = new MatDialogConfig();
    //
    // dialogConfig.disableClose = false;
    //
    // this.dialog.open(WhoCanReplyComponent, dialogConfig);
  }

  public async shareButtonHandler() {
    let fileCurrent = this.uploader.queue[0]._file;

    let mediaType = fileCurrent.type;
    let bytes = await fileCurrent.arrayBuffer();

    let uploadedImage = await this.uploadService.uploadTweetImageAsync(bytes, mediaType);
    let publishPostParameters = new PublishTweetParameters('Volen is the worst');
    publishPostParameters.medias = [ uploadedImage ];
    let postWithImage = await this.postsService.publishTweetAsync(publishPostParameters);
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
    this.location.back();
  }
}
