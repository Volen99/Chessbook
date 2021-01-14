import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-inserted-media',
  templateUrl: './inserted-media.component.html',
  styleUrls: ['../upload.component.scss', './inserted-media.component.css']
})
export class InsertedMediaComponent implements OnInit {
  private renderer: Renderer2;

  constructor(renderer: Renderer2, private el: ElementRef) {
    this.renderer = renderer;
  }

  ngOnInit(): void {

  }

  public isCloseIconHovered = false;

  handleCloseIconHover(event: MouseEvent) {
    this.isCloseIconHovered = !this.isCloseIconHovered;
  }
}
