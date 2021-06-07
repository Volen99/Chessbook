import {ChangeDetectorRef, Component, ComponentRef, Input, OnInit} from '@angular/core';
import {getScrollbarWidth} from "../../core/utils/scrollbar";
import {fromJS} from "immutable";
import {MediaGalleryComponent} from "../../components/media-gallery/media-gallery.component";
import {IMediaEntity} from "../../shared/post-object/Entities/interfaces/IMediaEntity";
import {NbDialogRef} from "../../sharebook-nebular/theme/components/dialog/dialog-ref";

const MEDIA_COMPONENTS = {MediaGalleryComponent, /*Video, Card, Poll, Hashtag, Audio*/};

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
    // {
    //   [].map.call(this.components, (component, i) => {
    //     debugger
    //     const componentName = component.getAttribute('data-component');
    //     const Component = MEDIA_COMPONENTS[componentName];
    //       const {media, card, poll, hashtag, ...props} = JSON.parse(component.getAttribute('data-props'));
    //
    //     Object.assign(props, {
    //       ...(media ? {media: fromJS(media)} : {}),
    //       // ...(card    ? { card:    fromJS(card)    } : {}),
    //       // ...(poll    ? { poll:    fromJS(poll)    } : {}),
    //       // ...(hashtag ? { hashtag: fromJS(hashtag) } : {}),
    //
    //       ...(componentName === 'Video' ? {
    //         componetIndex: i,
    //         // onOpenVideo: this.handleOpenVideo,
    //       } : {
    //         onOpenMedia: this.handleOpenMedia,
    //       }),
    //     });
    //   });
    // }

    this.handleOpenMedia(this.media, this.index);

  }

  mediaState: null;
  indexState: null;
  time: null;
  backgroundColor: null;
  options: null;

  handleOpenMedia = (media, index) => {
    document.body.classList.add('with-modals--active');
    // document.documentElement.style.marginRight = `${getScrollbarWidth()}px`;

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
