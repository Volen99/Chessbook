import {Directive, Renderer2, OnInit, Input} from '@angular/core';

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
      const secondMedia = document.getElementById('upload-media-2');
      const thirdMedia = document.getElementById('upload-media-3');

      this.mediaContainer.replaceChild(this.rightMediaSplit, secondMedia);
      this.mediaContainer.replaceChild(this.rightMediaSplit, thirdMedia);

      this.rightMediaSplit.appendChild(secondMedia);
      this.rightMediaSplit.appendChild(thirdMedia);

      this.rightMediaSplit.style.display = '';
    } else if (this.index === 4) {
      const firstMedia = document.getElementById('upload-media-1');
      const fourthMedia = document.getElementById('upload-media-4');

      this.mediaContainer.replaceChild(this.leftMediaSplit, firstMedia);
      this.mediaContainer.replaceChild(this.leftMediaSplit, fourthMedia);

      this.leftMediaSplit.appendChild(firstMedia);
      this.leftMediaSplit.appendChild(fourthMedia);

      this.leftMediaSplit.style.display = '';

      this.leftMediaSplit.parentNode.insertBefore(this.leftMediaSplit, this.mediaContainer.firstChild);
    }
  }
}


