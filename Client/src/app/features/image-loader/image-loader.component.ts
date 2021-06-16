import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent implements OnInit, AfterViewInit, AfterContentInit, OnChanges, OnDestroy {
  @ViewChild('can') can: ElementRef<HTMLCanvasElement>;

  @Input() alt: string = '';
  @Input() onClick: () => any;
  @Input() width: number | null = null;
  @Input() height: number | null = null;
  @Input() src: string;                 // fullSize
  @Input() previewSrc: string;
  @Input() zoomButtonHidden: boolean;

  private _canvasContext;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    let {alt, onClick, width, height, src, previewSrc, zoomButtonHidden} = changes;
    if (src) {
      if (this.src !== src.currentValue) {
        this.loadImage({alt, onClick, width, height, src, previewSrc, zoomButtonHidden});
      }
    }
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.loadImage(this.src);
  }

  ngAfterViewInit() {
    this.canvas = this.can.nativeElement;
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
  }

  get canvasContext() {
    if (!this.canvas) {
      return null;
    }
    this._canvasContext = this._canvasContext || this.canvas.getContext('2d');
    return this._canvasContext;
  }

  loading: boolean = true;
  error: boolean = false;
  widthState: number | null;

  removers = [];
  canvas = null;

  loadImage(props) {
    this.removeEventListeners();

    this.loading = true;
    this.error = false;

    Promise.all([
      this.previewSrc && this.loadPreviewCanvas(props),
      this.hasSize() && this.loadOriginalImage(props),
    ].filter(Boolean))
      .then(() => {
        this.loading = false;
        this.error = false;
        this.clearPreviewCanvas();
      })
      .catch(() => {
        this.loading = false;
        this.error = true;
      });
  }

  // please work...
  loadPreviewCanvas = ({previewSrc, width, height}) => new Promise((resolve, reject) => {
    const image = new Image();
    const removeEventListeners = () => {
      image.removeEventListener('error', handleError);
      image.removeEventListener('load', handleLoad);
    };
    const handleError = () => {
      removeEventListeners();
      reject();
    };
    const handleLoad = () => {
      removeEventListeners();
      this.canvasContext.drawImage(image, 0, 0, width, height);
      // @ts-ignore
      resolve();
    };
    image.addEventListener('error', handleError);
    image.addEventListener('load', handleLoad);
    image.src = previewSrc;
    this.removers.push(removeEventListeners);
  })

  clearPreviewCanvas() {
    const {width, height} = this.canvas;
    this.canvasContext.clearRect(0, 0, width, height);
  }

  loadOriginalImage = ({src}) => new Promise((resolve, reject) => {
    const image = new Image();
    const removeEventListeners = () => {
      image.removeEventListener('error', handleError);
      image.removeEventListener('load', handleLoad);
    };
    const handleError = () => {
      removeEventListeners();
      reject();
    };
    const handleLoad = () => {
      removeEventListeners();
      // @ts-ignore
      resolve();
    };
    image.addEventListener('error', handleError);
    image.addEventListener('load', handleLoad);
    image.src = src;
    this.removers.push(removeEventListeners);
  })

  removeEventListeners() {
    this.removers.forEach(listeners => listeners());
    this.removers = [];
  }

  hasSize() {
    return typeof this.width === 'number' && typeof this.height === 'number';
  }

  setCanvasRef = c => {
    this.canvas = c;
    if (c) {
      this.width = c.offsetWidth;
    }
  }

}
