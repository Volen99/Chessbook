import { Component, AfterViewChecked } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-about-sharebook',
  templateUrl: './about-sharebook.component.html',
  styleUrls: [ './about-sharebook.component.scss' ]
})

export class AboutSharebookComponent implements AfterViewChecked {
  private lastScrollHash: string;

  constructor(private viewportScroller: ViewportScroller) {
  }

  ngAfterViewChecked() {
    if (window.location.hash && window.location.hash !== this.lastScrollHash) {
      this.viewportScroller.scrollToAnchor(window.location.hash.replace('#', ''));

      this.lastScrollHash = window.location.hash;
    }
  }
}
