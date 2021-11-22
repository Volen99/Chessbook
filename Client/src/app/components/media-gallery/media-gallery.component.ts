import {
  AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {debounce} from 'lodash';

import {IMediaEntity} from "../../shared/post-object/Entities/interfaces/IMediaEntity";

@Component({
  selector: 'app-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, AfterViewChecked {
  @ViewChild('nodeRef') nodeRef: ElementRef<HTMLDivElement>;

  @Input() sensitive: boolean;
  @Input() standalone: boolean;
  @Input() media: IMediaEntity[];
  @Input() size: {};
  @Input() height: number;
  @Input() onOpenMedia: (media: IMediaEntity[], index: number) => any;
  @Input() defaultWidth: number;
  @Input() cacheWidth: (width: number) => any;
  @Input() visible: boolean;
  @Input() autoplay: boolean;
  @Input() onToggleVisibility: () => any;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
        // ..
    }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    window.addEventListener('resize', this.handleResize, { passive: true });

    this.node = this.nodeRef.nativeElement;

    if (this.node) {
      this._setDimensions();
    }
  }

  ngAfterViewChecked(): void {
    this.width = this.width || this.defaultWidth;

    if (this.isFullSizeEligible() && (this.standalone)) { //   || !cropImages
      if (this.width) {
        this.style.height = this.width / this.media[0].meta['small'].aspect;
      }
    } else if (this.width) {
      this.style.height = this.width / (16 / 9);
    } else {
      this.style.height = this.height;
    }

    // this fix: Expression has changed after it was checked. Previous value for 'height': 'undefined'. Current value: '285.1875'..
    this.cdr.detectChanges();

    this.uncached = this.media.every(attachment => attachment.mediaType === 'unknown');
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = debounce(() => {
    if (this.node) {
      this._setDimensions();
    }
  }, 250, {
    trailing: true,
  });


  width: number = 250;
  style: any = {};
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

  private _setDimensions () {
    const width = this.node.offsetWidth;

    // offsetWidth triggers a layout, so only calculate when we need to
    if (this.cacheWidth) {
      this.cacheWidth(width);
    }

    this.width = width;
  }

  isFullSizeEligible() {
    return this.media.length === 1 && this.media[0].meta['small'].aspect;
  }

}
