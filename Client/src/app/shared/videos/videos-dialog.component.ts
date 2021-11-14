import {Component, EventEmitter, Output, Input, ChangeDetectionStrategy} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {memoize} from 'lodash';

import {
  faPlay,
  faPlayCircle,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/pro-light-svg-icons';

import {VIDEOS_DIALOG_DATA} from './videos-dialog-data';

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbUrl: string;
}

const bypassSecurityTrustResourceUrl = memoize(
  (url: string, sanitizer: DomSanitizer) => sanitizer.bypassSecurityTrustResourceUrl(url)
);

@Component({
  selector: 'videos-dialog',
  templateUrl: './videos-dialog.component.html',
  styleUrls: ['./videos-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosDialogComponent {

  public videosData = VIDEOS_DIALOG_DATA;
  public selectedVideo = this.videosData[0];
  public scrollPosition = 0;
  public scrollVisibleItems = 4;
  public autoplay = false;
  private _isOpen = false;

  public get selectedVideoPath() {
    // Add the following parameter to reproduce the playlist: &list=PLZ4rRHIJepBt-ZdKw6cL6d6S6wYPplFAi
    let url = `https://www.youtube.com/embed/${this.selectedVideo.id}?rel=0`;
    if (this.autoplay) {
      url += '&autoplay=1';
    }
    return bypassSecurityTrustResourceUrl(url, this.sanitizer);
  }

  public get index() {
    return this.videosData.indexOf(this.selectedVideo) + 1;
  }

  public get total() {
    return this.videosData.length;
  }

  @Input()
  public set isOpen(value: boolean) {
    if (this._isOpen !== value) {
      this._isOpen = value;
      this.isOpenChange.emit(value);
    }
  }

  public get isOpen() {
    return this._isOpen;
  }

  @Output()
  public isOpenChange = new EventEmitter<boolean>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onClose = new EventEmitter();

  constructor(public sanitizer: DomSanitizer) {
  }

  faPlay = faPlay;
  faPlayCircle = faPlayCircle;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  public handleVideoItemClick(value: VideoItem) {
    this.selectedVideo = value;
    this.autoplay = true;
    this.updateScrollPosition(value);
  }

  private updateScrollPosition(value: VideoItem) {
    const index = this.videosData.indexOf(value);
    if (index < this.scrollPosition) {
      this.scrollPosition = index;
    } else if (index >= this.scrollPosition + this.scrollVisibleItems) {
      this.scrollPosition = index - this.scrollVisibleItems + 1;
    }
  }

  public handleDialogOnClose() {
    this.autoplay = false;
    this.isOpen = false;
    this.onClose.emit();
  }

  public handleScrollLeftClick() {
    this.scrollPosition = Math.max(this.scrollPosition - 1, 0);
  }

  public handleScrollRightClick() {
    this.scrollPosition = Math.min(this.scrollPosition + 1, this.videosData.length - this.scrollVisibleItems);
  }
}
