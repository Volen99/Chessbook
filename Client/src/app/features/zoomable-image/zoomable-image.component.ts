import {
  AfterContentInit,
  Component,
  ElementRef,
  Input, OnChanges, OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  faCompress
} from '@fortawesome/pro-light-svg-icons';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const NAV_BAR_HEIGHT = 66;

const getMidpoint = (p1, p2) => ({
  x: (p1.clientX + p2.clientX) / 2,
  y: (p1.clientY + p2.clientY) / 2,
});

const getDistance = (p1, p2) =>
  Math.sqrt(Math.pow(p1.clientX - p2.clientX, 2) + Math.pow(p1.clientY - p2.clientY, 2));

const clamp = (min, max, value) => Math.min(max, Math.max(min, value));

// Normalizing mousewheel speed across browsers
// copy from: https://github.com/facebookarchive/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js
const normalizeWheel = event => {
  // Reasonable defaults
  const PIXEL_STEP = 10;
  const LINE_HEIGHT = 40;
  const PAGE_HEIGHT = 800;

  let sX = 0,
    sY = 0, // spinX, spinY
    pX = 0,
    pY = 0; // pixelX, pixelY

  // Legacy
  if ('detail' in event) {
    sY = event.detail;
  }
  if ('wheelDelta' in event) {
    sY = -event.wheelDelta / 120;
  }
  if ('wheelDeltaY' in event) {
    sY = -event.wheelDeltaY / 120;
  }
  if ('wheelDeltaX' in event) {
    sX = -event.wheelDeltaX / 120;
  }

  // side scrolling on FF with DOMMouseScroll
  if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in event) {
    pY = event.deltaY;
  }
  if ('deltaX' in event) {
    pX = event.deltaX;
  }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode === 1) { // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else { // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) {
    sX = (pX < 1) ? -1 : 1;
  }
  if (pY && !sY) {
    sY = (pY < 1) ? -1 : 1;
  }

  return {
    spinX: sX,
    spinY: sY,
    pixelX: pX,
    pixelY: pY,
  };
};


@Component({
  selector: 'app-zoomable-image',
  templateUrl: './zoomable-image.component.html',
  styleUrls: ['./zoomable-image.component.scss']
})
export class ZoomableImageComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit {
  // HAHAHAHAHAHHAHHHHHHHHHHHAHHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHHAHAAAAAAAAAAAAAAAA https://stackoverflow.com/questions/56359504/how-should-i-use-the-new-static-option-for-viewchild-in-angular-8
  @ViewChild('containerRef', {static: true}) containerRef: ElementRef<HTMLDivElement>;
  @ViewChild('imageRef', {static: true}) imageRef: ElementRef<HTMLImageElement>;

  @Input() alt: string;
  @Input() src: string;
  @Input() width: number;
  @Input() height: number;
  @Input() onClick: () => any;
  @Input() zoomButtonHidden: boolean;

  constructor(private renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.zoomMatrix && this.scale) {
      this.zoomState = this.scale >= this.zoomMatrix.rate ? 'compress' : 'expand';

      if (this.scale === MIN_SCALE) {
        this.container.style.removeProperty('cursor');
      }
    }

    // reset when slide to next image
    if (this.zoomButtonHidden) {
      this.scale = MIN_SCALE;
      this.lockTranslate = {x: 0, y: 0};


      this.container.scrollLeft = 0;
      this.container.scrollTop = 0;
    }
  }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.container = this.containerRef.nativeElement;
    this.image = this.imageRef.nativeElement;

    let handler = this.handleTouchStart;
    this.container.addEventListener('touchstart', handler);
    this.removers.push(() => this.container.removeEventListener('touchstart', handler));
    handler = this.handleTouchMove;
    // on Chrome 56+, touch event listeners will default to passive
    // https://www.chromestatus.com/features/5093566007214080
    this.container.addEventListener('touchmove', handler, {passive: false});
    this.removers.push(() => this.container.removeEventListener('touchend', handler));

    handler = this.mouseDownHandler;
    this.container.addEventListener('mousedown', handler);
    this.removers.push(() => this.container.removeEventListener('mousedown', handler));

    handler = this.mouseWheelHandler;
    this.container.addEventListener('wheel', handler);
    this.removers.push(() => this.container.removeEventListener('wheel', handler));
    // Old Chrome
    this.container.addEventListener('mousewheel', handler);
    this.removers.push(() => this.container.removeEventListener('mousewheel', handler));
    // Old Firefox
    this.container.addEventListener('DOMMouseScroll', handler);
    this.removers.push(() => this.container.removeEventListener('DOMMouseScroll', handler));

    this.initZoomMatrix();

    this.overflow = this.scale === MIN_SCALE ? 'hidden' : 'scroll';
    this.zoomButtonShouldHide = this.navigationHidden || this.zoomButtonHidden || this.zoomMatrix.rate <= MIN_SCALE ? 'media-modal__zoom-button--hidden' : '';
    this.zoomButtonTitle = this.zoomState === 'compress' ? 'compress' : 'expand';
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
  }

  overflow: string;
  zoomButtonShouldHide: string;
  zoomButtonTitle: any;

  scale: number = MIN_SCALE;
  zoomMatrix: {
    type: string, // 'width' 'height'                         // null
    fullScreen: boolean, // bool                        // null
    rate: number, // full screen scale rate             // null
    clientWidth: number,                                // null
    clientHeight: number                                // null
    offsetWidth: number,                                // null
    offsetHeight: number,                               // null
    clientHeightFixed: number,                          // null
    scrollTop: number,                                  // null
    scrollLeft: number,                                 // null
    translateX: number,                                 // null
    translateY: number,                                 // null
  };
  zoomState: string = 'expand'; // 'expand' 'compress'
  navigationHidden: boolean = false;
  dragPosition = {top: 0, left: 0, x: 0, y: 0};
  dragged: boolean = false;
  lockScroll = {x: 0, y: 0};
  lockTranslate = {x: 0, y: 0};


  removers = [];
  container = null;
  image = null;
  lastTouchEndTime = 0;
  lastDistance = 0;

  faCompress = faCompress;

  removeEventListeners() {
    this.removers.forEach(listeners => listeners());
    this.removers = [];
  }

  mouseWheelHandler = e => {
    e.preventDefault();

    const event = normalizeWheel(e);

    if (this.zoomMatrix.type === 'width') {
      // full width, scroll vertical
      this.container.scrollTop = Math.max(this.container.scrollTop + event.pixelY, this.lockScroll.y);
    } else {
      // full height, scroll horizontal
      this.container.scrollLeft = Math.max(this.container.scrollLeft + event.pixelY, this.lockScroll.x);
    }

    // lock horizontal scroll
    this.container.scrollLeft = Math.max(this.container.scrollLeft + event.pixelX, this.lockScroll.x);
  };

  mouseDownHandler = e => {
    this.container.style.cursor = 'grabbing';
    this.container.style.userSelect = 'none';

    this.dragPosition = {
      left: this.container.scrollLeft,
      top: this.container.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };

    this.image.addEventListener('mousemove', this.mouseMoveHandler);
    this.image.addEventListener('mouseup', this.mouseUpHandler);
  };

  mouseMoveHandler = e => {
    const dx = e.clientX - this.dragPosition.x;
    const dy = e.clientY - this.dragPosition.y;

    this.container.scrollLeft = Math.max(this.dragPosition.left - dx, this.lockScroll.x);
    this.container.scrollTop = Math.max(this.dragPosition.top - dy, this.lockScroll.y);

    this.dragged = true;
  };

  mouseUpHandler = () => {
    this.container.style.cursor = 'grab';
    this.container.style.removeProperty('user-select');

    this.image.removeEventListener('mousemove', this.mouseMoveHandler);
    this.image.removeEventListener('mouseup', this.mouseUpHandler);
  };

  handleTouchStart = e => {
    if (e.touches.length !== 2) {
      return;
    }

    // @ts-ignore
    this.lastDistance = getDistance(...e.touches);
  };

  handleTouchMove = e => {
    const {scrollTop, scrollHeight, clientHeight} = this.container;
    if (e.touches.length === 1 && scrollTop !== scrollHeight - clientHeight) {
      // prevent propagating event to MediaModal
      e.stopPropagation();
      return;
    }
    if (e.touches.length !== 2) return;

    e.preventDefault();
    e.stopPropagation();

    // @ts-ignore
    const distance = getDistance(...e.touches);
    // @ts-ignore
    const midpoint = getMidpoint(...e.touches);
    const _MAX_SCALE = Math.max(MAX_SCALE, this.zoomMatrix.rate);
    const scale = clamp(MIN_SCALE, _MAX_SCALE, this.scale * distance / this.lastDistance);

    this.zoom(scale, midpoint);

    // this.lastMidpoint = midpoint;
    this.lastDistance = distance;
  };

  zoom(nextScale, midpoint) {
    const {scrollLeft, scrollTop} = this.container;

    // math memo:
    // x = (scrollLeft + midpoint.x) / scrollWidth
    // x' = (nextScrollLeft + midpoint.x) / nextScrollWidth
    // scrollWidth = clientWidth * scale
    // scrollWidth' = clientWidth * nextScale
    // Solve x = x' for nextScrollLeft
    const nextScrollLeft = (scrollLeft + midpoint.x) * nextScale / this.scale - midpoint.x;
    const nextScrollTop = (scrollTop + midpoint.y) * nextScale / this.scale - midpoint.y;

    // https://reactjs.org/docs/react-component.html#setstate 🤔
    this.scale = nextScale;

    this.container.scrollLeft = nextScrollLeft;
    this.container.scrollTop = nextScrollTop;
    // reset the translateX/Y constantly
    if (nextScale < this.zoomMatrix.rate) {
      this.lockTranslate = {
        x: this.zoomMatrix.fullScreen ? 0 : this.zoomMatrix.translateX * ((nextScale - MIN_SCALE) / (this.zoomMatrix.rate - MIN_SCALE)),
        y: this.zoomMatrix.fullScreen ? 0 : this.zoomMatrix.translateY * ((nextScale - MIN_SCALE) / (this.zoomMatrix.rate - MIN_SCALE)),
      };
    }
  }

  handleClick = e => {
    // don't propagate event to MediaModal
    e.stopPropagation();
    const dragged = this.dragged;
    this.dragged = false;
    if (dragged) {
      return;
    }
    const handler = this.onClick;
    if (handler) {
      handler();
    }
    this.navigationHidden = !this.navigationHidden;
  };

  handleMouseDown = e => {
    e.preventDefault();
  };

  initZoomMatrix = () => {
    const {clientWidth, clientHeight} = this.container;
    const {offsetWidth, offsetHeight} = this.image;
    const clientHeightFixed = clientHeight - NAV_BAR_HEIGHT;

    const type = this.width / this.height < clientWidth / clientHeightFixed ? 'width' : 'height';
    const fullScreen = type === 'width' ? this.width > clientWidth : this.height > clientHeightFixed;
    const rate = type === 'width' ? Math.min(clientWidth, this.width) / offsetWidth : Math.min(clientHeightFixed, this.height) / offsetHeight;
    const scrollTop = type === 'width' ? (clientHeight - offsetHeight) / 2 - NAV_BAR_HEIGHT : (clientHeightFixed - offsetHeight) / 2;
    const scrollLeft = (clientWidth - offsetWidth) / 2;
    const translateX = type === 'width' ? (this.width - offsetWidth) / (2 * rate) : 0;
    const translateY = type === 'height' ? (this.height - offsetHeight) / (2 * rate) : 0;


    this.zoomMatrix = {
      type,
      fullScreen,
      rate,
      clientWidth,
      clientHeight,
      offsetWidth,
      offsetHeight,
      clientHeightFixed,
      scrollTop,
      scrollLeft,
      translateX,
      translateY,
    };
  };

  handleZoomClick = e => {
    e.preventDefault();
    e.stopPropagation();

    if (this.scale >= this.zoomMatrix.rate) {
      this.scale = MIN_SCALE;
      this.lockScroll = {
        x: 0,
        y: 0,
      };
      this.lockTranslate = {
        x: 0,
        y: 0,
      };
      this.container.scrollLeft = 0;
      this.container.scrollTop = 0;
    } else {
      this.scale = this.zoomMatrix.rate;
      this.lockScroll = {
        x: this.zoomMatrix.scrollLeft,
        y: this.zoomMatrix.scrollTop,
      };
      this.lockTranslate = {
        x: this.zoomMatrix.fullScreen ? 0 : this.zoomMatrix.translateX,
        y: this.zoomMatrix.fullScreen ? 0 : this.zoomMatrix.translateY,
      };

      this.container.scrollLeft = this.zoomMatrix.scrollLeft;
      this.container.scrollTop = this.zoomMatrix.scrollTop;
    }

    this.container.style.cursor = 'grab';
    this.container.style.removeProperty('user-select');
  };


}
