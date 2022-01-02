import {Component, Input, OnInit} from '@angular/core';

import {NbDialogRef} from '../../../sharebook-nebular/theme/components/dialog/dialog-ref';
import {IVideoItem} from '../models/video-item.model';
import {NbToastrService} from '../../../sharebook-nebular/theme/components/toastr/toastr.service';
import {IsVideoPipe} from "../../shared-main/angular/pipes/is-video.pipe";

@Component({
  selector: 'app-videos-dialog-crud',
  templateUrl: './videos-dialog-crud.component.html',
  styleUrls: ['./videos-dialog-crud.component.scss']
})
export class VideosDialogCrudComponent implements OnInit {
  @Input() isEdit = undefined;
  @Input() id: number;
  @Input() video: IVideoItem;

  constructor(private ref: NbDialogRef<VideosDialogCrudComponent>, private notifier: NbToastrService) {}

  ngOnInit(): void {
  }

  cancel() {
    this.ref.close();
  }

  submit(video: any) {
    if (!video.videoId) {
      this.err(); return;
    }

    let parts = IsVideoPipe._youtubeRegEx.exec(video.videoId);
    if (!parts) {
      this.err(); return;
    }
    video.videoId = `${parts[5]?.split(' ')[0]}`;

    this.ref.close(video);
  }

  private err() {
    this.notifier.warning('', 'Please fill the form correctly then try submitting again');
  }

}
