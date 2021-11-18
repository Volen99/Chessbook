import {
  Component,
  EventEmitter,
  Output,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {memoize} from 'lodash';

import {
  faPlay,
  faPlayCircle,
  faAngleRight,
  faAngleLeft,
  faPen,
  faTrashAlt,
} from '@fortawesome/pro-light-svg-icons';

import {VIDEOS_DIALOG_DATA} from './videos-dialog-data';
import {IVideoItem} from './models/video-item.model';
import {YoutubeVideosService} from './youtube-videos.service';
import {NbToastrService} from '../../sharebook-nebular/theme/components/toastr/toastr.service';
import {VideosDialogCrudComponent} from './video-crud/videos-dialog-crud.component';
import {NbDialogService} from '../../sharebook-nebular/theme/components/dialog/dialog.service';
import {UserStore} from '../../core/stores/user.store';
import {UserRight} from '../models/users/user-right.enum';

const bypassSecurityTrustResourceUrl = memoize(
  (url: string, sanitizer: DomSanitizer) => sanitizer.bypassSecurityTrustResourceUrl(url)
);

@Component({
  selector: 'videos-dialog',
  templateUrl: './videos-dialog.component.html',
  styleUrls: ['./videos-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosDialogComponent implements OnInit {
  @Input() public videosData: IVideoItem[] = VIDEOS_DIALOG_DATA;
  @Input() userId: number = undefined;
  @Input() title: string = 'Watch Introduction Video to Chessbook';
  @Output() public isOpenChange = new EventEmitter<boolean>();
  @Output() public onClose = new EventEmitter();
  @Input()
  public set isOpen(value: boolean) {
    if (this._isOpen !== value) {
      this._isOpen = value;
      this.isOpenChange.emit(value);
    }
  }

  private _isOpen = false;

  public get selectedVideoPath() {
    // Add the following parameter to reproduce the playlist: &list=PLZ4rRHIJepBt-ZdKw6cL6d6S6wYPplFAi
    let url = `https://www.youtube.com/embed/${this.selectedVideo.videoId}?rel=0`;
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

  public get isOpen() {
    return this._isOpen;
  }

  constructor(private youtubeVideosService: YoutubeVideosService, public sanitizer: DomSanitizer,
              private cdr: ChangeDetectorRef, private notifier: NbToastrService, private dialogService: NbDialogService,
              private userStore: UserStore) {
  }

  ngOnInit(): void {
    if (this.userId) {
      this.youtubeVideosService.getVideos(this.userId)
        .subscribe((videos: IVideoItem[]) => {
          this.videosData = videos;
          this.selectedVideo = this.videosData[0];
          this.cdr.markForCheck();
        });
    }

  }

  public selectedVideo = this.videosData[0];
  public scrollPosition = 0;
  public scrollVisibleItems = 4;
  public autoplay = false;

  faPlay = faPlay;
  faPlayCircle = faPlayCircle;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  faPen = faPen;
  faTrashAlt = faTrashAlt;

  public handleVideoItemClick(value: IVideoItem) {
    this.selectedVideo = value;
    this.autoplay = true;
    this.updateScrollPosition(value);
  }

  private updateScrollPosition(value: IVideoItem) {
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

  editVideo(event: any, id: number) {
    event.preventDefault();
    event.stopPropagation();

    this.dialogService.open(VideosDialogCrudComponent, {
      context: {
        isEdit: true,
        id: id,
        video: this.videosData.filter(v => v.id === id)[0],
      },
      closeOnBackdropClick: false,
    }).onClose.subscribe((data: IVideoItem) => {
      if (!data) {
        return;
      }

      this.youtubeVideosService.editVideo(id, data)
        .subscribe((data: IVideoItem) => {
          let video = this.videosData.filter(v => v.id === data.id)[0];
          video.videoId = data.videoId;
          video.title = data.title;
          video.description = data.description;
          video.thumbUrl = data.thumbUrl;

          this.cdr.markForCheck();

          this.notifier.success('Video successfully updated', 'Success');
        });

    });
  }

  deleteVideo(event, id: number) {
    event.preventDefault();
    event.stopPropagation();

    this.youtubeVideosService.deleteVideo(id)
      .subscribe((data) => {

        this.videosData = this.videosData.filter(v => v.id !== id);
        this.cdr.markForCheck();

        this.notifier.success('Video successfully deleted', 'Success');
      });
  }

  isManageable() {
    if (!this.isUserLoggedIn()) {
      return false;
    }

    return this.userId === this.userStore.getUser().id || this.userStore.getUser().hasRight(UserRight.MANAGE_USERS);
  }

  isUserLoggedIn() {
    return !!this.userStore.getUser();
  }
}
