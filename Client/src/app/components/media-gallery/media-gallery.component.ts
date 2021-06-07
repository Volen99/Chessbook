import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IMediaEntity} from "../../shared/post-object/Entities/interfaces/IMediaEntity";

@Component({
  selector: 'app-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent implements OnInit, AfterViewInit {
  @ViewChild('nodeRef') nodeRef: ElementRef<HTMLDivElement>;

  @Input() sensitive: boolean;
  @Input() standalone: boolean;
  @Input() media: IMediaEntity[];
  @Input() size: { };
  @Input() height: number;
  @Input() onOpenMedia: (media: IMediaEntity[], index: number) => any;
  @Input() defaultWidth: number;
  @Input() cacheWidth: (width: number) => any;
  @Input() visible: boolean;
  @Input() autoplay: boolean;
  @Input() onToggleVisibility: () => any;

  constructor() {
  }

  ngOnInit(): void {
    if (this.isFullSizeEligible() && (this.standalone)) { //   || !cropImages
      if (this.width) {
        this.style.height = this.width / this.media[0].meta['original'].small.aspect;
      }
    } else if (this.width) {
      this.style.height = this.width / (16/9);
    } else {
      this.style.height = this.height;
    }

    this.sizeState     = this.media/*.take(4)*/.length;
    this.uncached = this.media.every(attachment => attachment.mediaType === 'unknown');



  }

  ngAfterViewInit(): void {
    this.node = this.nodeRef;

    if (this.node) {
      this._setDimensions();
    }
  }

  width: number;
  style: any;
  sizeState: number;
  uncached: boolean;

  node = null;

  handleOpen = () => {
    if (this.onToggleVisibility) {
      this.onToggleVisibility();
    } else {
      this.visible = !this.visible;
    }
  }

  handleClick = (index) => {
    this.onOpenMedia(this.media, index);
  }

  handleRef = c => {
    this.node = c;

    if (this.node) {
      this._setDimensions();
    }
  }

  _setDimensions () {
    const width = this.node.offsetWidth;

    // offsetWidth triggers a layout, so only calculate when we need to
    if (this.cacheWidth) {
      this.cacheWidth(width);
    }

    this.width = width;

  }

  isFullSizeEligible() {
    return this.media.length === 1 && this.media[0].meta['original'].small.aspect;
  }


}
