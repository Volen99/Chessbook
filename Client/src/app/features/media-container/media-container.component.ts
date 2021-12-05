import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {IMediaEntity} from "../../shared/post-object/Entities/interfaces/IMediaEntity";
import {NbDialogRef} from "../../sharebook-nebular/theme/components/dialog/dialog-ref";

@Component({
  selector: 'app-media-container',
  templateUrl: './media-container.component.html',
  styleUrls: ['./media-container.component.scss']
})
export class MediaContainerComponent implements OnInit {
  @Input() media: IMediaEntity[];
  @Input() index: number;

  constructor(protected ref: NbDialogRef<MediaContainerComponent>, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.handleOpenMedia(this.media, this.index);
  }

  mediaState: null;
  indexState: null;
  time: null;
  backgroundColor: null;
  options: null;

  handleOpenMedia = (media, index) => {
    document.body.classList.add('with-modals--active');

    this.mediaState = media;
    this.indexState = index;
  }

  handleCloseMedia = () => {
    document.body.classList.remove('with-modals--active');
    document.documentElement.style.marginRight = '0';

    this.mediaState = null;
    this.indexState = null;
    this.time = null;
    this.backgroundColor = null;
    this.options = null;

    this.ref.close();
  }

  setBackgroundColor = color => {
    this.backgroundColor = color;
    this.cdr.detectChanges();
  }

}
