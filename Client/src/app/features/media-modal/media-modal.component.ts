import {
  AfterViewInit,
  Component, EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, Output,
  SimpleChanges, ViewChild
} from '@angular/core';

import {SwiperComponent} from 'ngx-swiper-wrapper';
import {SwiperOptions} from 'swiper';

import {
  faComment,
  faShare,
  faHeart,
} from '@fortawesome/pro-light-svg-icons';

import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from '@fortawesome/pro-solid-svg-icons';
import {getAverageFromBlurhash} from "../../shared/core-utils/miscs/blurhash";
import {IMediaEntity} from "../../shared/post-object/Entities/interfaces/IMediaEntity";

@Component({
  selector: 'app-media-modal',
  templateUrl: './media-modal.component.html',
  styleUrls: ['./media-modal.component.scss']
})
export class MediaModalComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;

  @Input() media: IMediaEntity[];
  @Input() postId: number;
  @Input() index: number;
  @Input() onClose: () => any;
  @Output() backgroundColorChange = new EventEmitter<any>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    let {index} = changes;
    if (index) {
      if (index.previousValue !== this.indexState) {
        this._sendBackgroundColor();
      }
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    window.addEventListener('keydown', this.handleKeyDown, false);

    if (this.componentRef) {
      // TODO: :(
      let swiper = document.querySelector('swiper');
      if (swiper) {
        swiper.firstElementChild.setAttribute('style', 'z-index: -1');
      }
    }

    this._sendBackgroundColor();
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handleKeyDown);

    this.backgroundColorChange.emit(null);
  }

  // you can't use 100vh, because the viewport height is taller
  // than the visible part of the document in some mobile
  // browsers when it's address bar is visible.
  // https://developers.google.com/web/updates/2016/12/url-bar-resizing
  swipeableViewsStyle = {
    width: '100%',
    height: '100%',
  };


  public swipeType: string = 'component';

  public disabled: boolean = false;

  public config: SwiperOptions = {
    a11y: {enabled: true},
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false,
  };

  indexState: number | null;
  navigationHidden: boolean;
  zoomButtonHidden: boolean;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faTimes = faTimes;

  faComment = faComment;
  faShare = faShare;
  faHeart = faHeart;

  handleSwipe = (index) => {
    this.indexState = index % this.media.length;
  }

  handleTransitionEnd = () => {
    this.zoomButtonHidden = false;
  }

  handleNextClick = () => {
    this.indexState = (this.getIndex() + 1) % this.media.length;
    this.zoomButtonHidden = true;

    if (this.media.length > 1) {
      this._sendBackgroundColor();
    }
  }

  handlePrevClick = () => {
    this.indexState = (this.media.length + this.getIndex() - 1) % this.media.length;
    this.zoomButtonHidden = true;

    if (this.media.length > 1) {
      this._sendBackgroundColor();
    }
  }

  handleChangeIndex = (e) => {
    const index = Number(e.currentTarget.getAttribute('data-index'));

    this.indexState = index % this.media.length;
    this.zoomButtonHidden = true;

    if (this.media.length > 1) {
      this._sendBackgroundColor();
    }
  }

  getIndex() {
    return this.indexState != null ? this.indexState : this.index;
  }

  handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        this.handlePrevClick();
        e.preventDefault();
        e.stopPropagation();
        break;
      case 'ArrowRight':
        this.handleNextClick();
        e.preventDefault();
        e.stopPropagation();
        break;
    }
  }

  toggleNavigation = () => {
    this.navigationHidden = !this.navigationHidden;
  }

  _sendBackgroundColor() {
    const index = this.getIndex();
    const blurhash = this.media[index].blurhash;

    if (blurhash) {
      const backgroundColor = getAverageFromBlurhash(blurhash);

      this.backgroundColorChange.emit(backgroundColor);
    }
  }

}
