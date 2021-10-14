import {Component, Input, OnInit} from '@angular/core';
import {IMediaEntity} from "../../../shared/post-object/Entities/interfaces/IMediaEntity";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() attachment: IMediaEntity;
  @Input() standalone: boolean = false;
  @Input() index: number = 0;
  @Input() size: number = 1;
  @Input() onClick: (index: number) => any;
  @Input() displayWidth: number;
  @Input() visible: boolean;
  @Input() autoplay: boolean;

  constructor() {
  }

  width  = 50;
  height = 100;
  top    = 'auto';
  left   = 'auto';
  bottom = 'auto';
  right  = 'auto';

  ngOnInit(): void {
    // const { attachment, index, size, standalone, displayWidth, visible } = this.props;

    // let width  = 50;
    // let height = 100;
    // let top    = 'auto';
    // let left   = 'auto';
    // let bottom = 'auto';
    // let right  = 'auto';

    debugger
    if (this.size === 1) {
      this.width = 100;
    }

    if (this.size === 4 || (this.size === 3 && this.index > 0)) {
      this.height = 50;
    }

    if (this.size === 2) {
      if (this.index === 0) {
        this.right = '2px';
      } else {
        this.left = '2px';
      }
    } else if (this.size === 3) {
      if (this.index === 0) {
        this.right = '2px';
      } else if (this.index > 0) {
        this.left = '2px';
      }

      if (this.index === 1) {
        this.bottom = '2px';
      } else if (this.index > 1) {
        this.top = '2px';
      }
    } else if (this.size === 4) {
      if (this.index === 0 || this.index === 2) {
        this.right = '2px';
      }

      if (this.index === 1 || this.index === 3) {
        this.left = '2px';
      }

      if (this.index < 2) {
        this.bottom = '2px';
      } else {
        this.top = '2px';
      }
    }

    let thumbnail = '';

    if (true) { // this.attachment.get('type') === 'image'
      this.previewUrl   = this.attachment.imageUrl;
      this.previewWidth = this.attachment.meta['small'].width;       // this.attachment.getIn(['meta', 'small', 'width']);

      this.originalUrl   = this.attachment.fullSizeImageUrl;
      this.originalWidth = this.attachment.meta['original'].width;

      this.hasSize = typeof this.originalWidth === 'number' && typeof this.previewWidth === 'number';

      this.srcSet = this.hasSize ? `${this.originalUrl} ${this.originalWidth}w, ${this.previewUrl} ${this.previewWidth}w` : null;
      this.sizes  = this.hasSize && (this.displayWidth > 0) ? `${this.displayWidth * (this.width / 100)}px` : null;

      const focusX = /*this.attachment.getIn(['meta', 'focus', 'x']) ||*/ 0;
      const focusY = /*this.attachment.getIn(['meta', 'focus', 'y']) ||*/ 0;
      this.x      = ((focusX /  2) + .5) * 100;
      this.y      = ((focusY / -2) + .5) * 100;

      this.handleImageLoad();
    }
  }

  previewUrl: string;
  previewWidth: string;

  originalUrl: string;
  originalWidth: string;

  hasSize: boolean;

  srcSet: string;
  sizes: string;

  x: number;
  y: number;

  loaded: boolean = false;

  handleImageLoad = () => {
    this.loaded = true;
  }

  handleMouseEnter = (e) => {
    if (this.hoverToPlay()) {
      e.target.play();
    }
  }

  handleMouseLeave = (e) => {
    if (this.hoverToPlay()) {
      e.target.pause();
      e.target.currentTime = 0;
    }
  }

  getAutoPlay() {
    // return this.autoplay || autoPlayGif;
  }

  hoverToPlay() {
    // return !this.getAutoPlay() && this.attachment.get('type') === 'gifv';

    return null;
  }

  handleClick = (e) => {
    if (e.button === 0 && !(e.ctrlKey || e.metaKey)) {
      if (this.hoverToPlay()) {
        e.target.pause();
        e.target.currentTime = 0;
      }
      e.preventDefault();
      this.onClick(this.index);
    }

    e.stopPropagation();
  }

}
