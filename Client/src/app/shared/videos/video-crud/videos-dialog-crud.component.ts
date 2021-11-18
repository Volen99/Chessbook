import {Component, Input, OnInit} from '@angular/core';

import {NbDialogRef} from '../../../sharebook-nebular/theme/components/dialog/dialog-ref';
import {IVideoItem} from '../models/video-item.model';

@Component({
  selector: 'app-videos-dialog-crud',
  templateUrl: './videos-dialog-crud.component.html',
  styleUrls: ['./videos-dialog-crud.component.scss']
})
export class VideosDialogCrudComponent implements OnInit {
  @Input() isEdit = undefined;
  @Input() id: number;
  @Input() video: IVideoItem;

  constructor(private ref: NbDialogRef<VideosDialogCrudComponent>) {}

  ngOnInit(): void {
  }

  cancel() {
    this.ref.close();
  }

  submit(video: any/*IVideoItem*/) {
    this.ref.close(video);
  }

}
