import {AfterViewInit,
  ChangeDetectionStrategy,
  Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {decode} from "blurhash";

@Component({
  selector: 'app-blurhash',
  templateUrl: './blurhash.component.html',
  styleUrls: ['./blurhash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlurhashComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('canvasRef') canvasRef: ElementRef<HTMLCanvasElement>;

  @Input() hash: any;
  @Input() width: number = 32;
  @Input() height: number = this.width;
  @Input() dummy: boolean = false;
  @Input() canvasProps;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef;
  }

  // https://reactjs.org/docs/hooks-effect.html
  ngOnChanges(changes: SimpleChanges) {
    let { dummy, hash, width, height } = changes;
    if (dummy.previousValue !== dummy.currentValue && hash.previousValue !== hash.currentValue
      && width.previousValue !== width.currentValue && height.previousValue !== height.currentValue) {
      if (this.dummy || !this.hash) {
        return;
      }

      this.canvas.width = this.canvas.width; // resets canvas
      try {
        const pixels = decode(this.hash, this.width, this.height);
        const ctx = this.canvas.getContext('2d'); // nooo please not ctx... too much nostalgia ;(( 🌧 ;((
        const imageData = new ImageData(pixels, this.width, this.height);

        ctx.putImageData(imageData, 0, 0);
      } catch (err) {
        console.error('Blurhash decoding failure', { err, hash: this.hash });
      }
    }
  }

  canvas = null;

}

