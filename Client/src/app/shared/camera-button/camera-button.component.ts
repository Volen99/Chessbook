import {Component, AfterViewInit, HostListener, Input} from '@angular/core';

import {
  faVideo,
} from '@fortawesome/pro-light-svg-icons';
import {VideosDialogComponent} from '../videos/videos-dialog.component';
import {NbDialogService} from '../../sharebook-nebular/theme/components/dialog/dialog.service';
import {SizeProp} from '@fortawesome/fontawesome-svg-core';
import {NbComponentSize} from '../../sharebook-nebular/theme/components/component-size';

@Component({
  selector: 'app-camera-button',
  templateUrl: './camera-button.component.html',
  styleUrls: ['./camera-button.component.scss']
})
export class CameraButtonComponent implements AfterViewInit {
//  public quickTipsCount$ = this.quickTipsService.newQuickTips$.pipe(map(l => l.length));

  @Input() btnSize: NbComponentSize;
  @Input() iconSize: SizeProp = 'lg';

  constructor(private dialogService: NbDialogService) {

  }

  @HostListener('window:resize')
  public onWindowResize(): void {
   // this.menu.moreOptions.close();
  }

  public ngAfterViewInit(): void {

  }

  faVideo = faVideo;

  public handleHelpButtonClick() {
    this.handleOpenVideosDialog();
  }

  private handleOpenVideosDialog() {
    this.dialogService.open(VideosDialogComponent, {
      context: {
        isOpen: true,
      },
      closeOnEsc: true,
      closeOnBackdropClick: false,
    });
  }

}
