import {Directive, Renderer2, OnInit, Input, ElementRef} from '@angular/core';

@Directive({
  selector: '[appMediaSplit]'
})
export class MediaSplitDirective implements OnInit {
  @Input() index: number;

  private mediaContainer = document.getElementById('media-container');
  private leftMediaSplit = document.getElementById('left-media-split');
  private rightMediaSplit = document.getElementById('right-media-split');

  constructor() {
  }

  ngOnInit(): void {
    if (this.index === 3) {
      this.doWork(2, 3, this.rightMediaSplit);
    } else if (this.index === 4) {
      this.doWork(1, 4, this.leftMediaSplit);

      this.leftMediaSplit.parentNode.insertBefore(this.leftMediaSplit, this.mediaContainer.firstChild);
    }
  }

  // dopiest name ever 🔥 28.01.2021, Thursday, 13:35 | Relaxing Piano Music For Study and Focus
  private doWork(i1: number, i2: number, mediaSplitContainer: HTMLElement) {
    const elFirst = document.getElementById(`upload-media-${i1}`);
    const elSecond = document.getElementById(`upload-media-${i2}`);

    this.mediaContainer.replaceChild(this.rightMediaSplit, elFirst);
    this.mediaContainer.replaceChild(this.rightMediaSplit, elSecond);

    mediaSplitContainer.appendChild(elFirst);
    mediaSplitContainer.appendChild(elSecond);

    mediaSplitContainer.style.display = '';
  }
}


