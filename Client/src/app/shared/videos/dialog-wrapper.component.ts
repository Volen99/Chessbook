import {
  Component,
  Input,
  HostBinding,
  Output,
  EventEmitter,
  AfterContentInit,
  ChangeDetectorRef,
} from '@angular/core';

import {
  faTimes,
  faWindowMaximize,
  faWindowRestore,
  faVideoPlus
} from '@fortawesome/pro-light-svg-icons';

import {
  faVideoPlus as faVideoPlusSolid
} from '@fortawesome/pro-solid-svg-icons';

import {NbDialogRef} from '../../sharebook-nebular/theme/components/dialog/dialog-ref';
import {VideosDialogComponent} from './videos-dialog.component';
import {NbDialogService} from '../../sharebook-nebular/theme/components/dialog/dialog.service';
import {VideosDialogCrudComponent} from './video-crud/videos-dialog-crud.component';
import {IVideoItem} from './models/video-item.model';
import {YoutubeVideosService} from './youtube-videos.service';
import {NbToastrService} from '../../sharebook-nebular/theme/components/toastr/toastr.service';
import {UserStore} from '../../core/stores/user.store';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'dialog-wrapper-title',
  template: '<ng-content></ng-content>'
})
export class DialogWrapperTitleComponent {
  @HostBinding('class')
  class = 'dialog-wrapper_title';
}

@Component({
  selector: 'dialog-wrapper-body',
  template: '<ng-content></ng-content>'
})
export class DialogWrapperBodyComponent {
  @HostBinding('class')
  class = 'dialog-wrapper_body';
}

@Component({
  selector: 'dialog-wrapper-actions',
  template: '<ng-content></ng-content>'
})
export class DialogWrapperActionsComponent {
  @HostBinding('class')
  class = 'dialog-wrapper_actions';
}

export type DialogWrapperSize = 'auto' | 'small' | 'medium' | 'large' | 'extra-large' | 'full-screen';

@Component({
  selector: 'dialog-wrapper',
  templateUrl: './dialog-wrapper.component.html',
  styleUrls: ['./dialog-wrapper.component.scss']
})
export class DialogWrapperComponent implements AfterContentInit {
  @Input() videosData: IVideoItem[];
  @Input() userId: number;


  private _isOpen = false;
  private _contentInit = false;

  element: any;

  @Input()
  public hasCloseButton = true;

  @Input()
  public closeOnOutsideSelect = false;

  @Input()
  public closeOnEscape = true;

  @Input()
  public dialogClass = '';

  @Input()
  public size: DialogWrapperSize = 'auto';

  @Input()
  public canMaximize = true;

  @Input()
  public maximized = false;

  @Output()
  public maximizedChange = new EventEmitter<boolean>();

  @Output()
  public closeButtonClick = new EventEmitter();

  @Input()
  public get isOpen() {
    return this._isOpen;
  }

  public set isOpen(value: boolean) {
    if (value !== this._isOpen) {
      this._isOpen = value;
      this.isOpenChange.emit(value);
    }
  }

  @Output() public isOpenChange = new EventEmitter<boolean>();

  public get internalIsOpen() {
    // The igx-dialog doesn't meassure correctly if it's instantiated as true
    // we wait for the content to be ready before opening
    return this._contentInit && this._isOpen;
  }

  constructor(private changeDetection: ChangeDetectorRef, private ref: NbDialogRef<VideosDialogComponent>,
              private dialogService: NbDialogService, private youtubeVideosService: YoutubeVideosService,
              private notifier: NbToastrService, private userStore: UserStore) {
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this._contentInit = true;
      this.changeDetection.markForCheck();
    });
  }

  isVideoSolid = false;

  faTimes = faTimes;
  faWindowMaximize = faWindowMaximize;
  faWindowRestore = faWindowRestore;

  faVideoPlus = faVideoPlus;
  faVideoPlusSolid = faVideoPlusSolid;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isVideoSolid = false;
    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  handleCloseButtonClick() {
    this.ref.close();
    this.closeButtonClick.emit();
    // this.dialog.close();
  }

  handleMaximizeButtonClick() {
    this.maximized = !this.maximized;
    this.maximizedChange.emit(this.maximized);
  }

  openVideosCrudModal() {
    if (!this.isManageable()) {
      alert('I always wanted to become a hacker and use my hacking skills to hack NASA and finally find the secret about Aliens, ' + 'but unfortunately, I am not smart for that but you, yes you, can still achieve this :))');
      return;
    }

    this.isVideoSolid = true;
    this.dialogService.open(VideosDialogCrudComponent, {
      context: {
        isEdit: false,
      },
      closeOnBackdropClick: false,
    }).onClose.subscribe((data: IVideoItem) => {
      this.isVideoSolid = false;
      this.changeDetection.markForCheck();
      if (!data) {
        return;
      }

      this.youtubeVideosService.addVideo(data)
        .subscribe((data: IVideoItem) => {
          this.videosData.push(data);
          this.changeDetection.markForCheck(); // TODO: emit an event!? 🤔

          this.notifier.success('Video added', 'Success');
        });

    });
  }

  isManageable() {
    if (!this.isUserLoggedIn()) {
      return false;
    }

    return this.userId === this.userStore.getUser().id;
  }

  isUserLoggedIn() {
    return !!this.userStore.getUser();
  }
}
