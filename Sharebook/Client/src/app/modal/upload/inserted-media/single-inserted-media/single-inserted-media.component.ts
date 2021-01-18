import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-single-inserted-media',
  templateUrl: './single-inserted-media.component.html',
  styleUrls: ['../../upload.component.scss', '../inserted-media.component.scss', './single-inserted-media.component.css']
})
export class SingleInsertedMediaComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  public isCloseIconHovered = false;

  handleCloseIconHover(event: MouseEvent) {
    this.isCloseIconHovered = !this.isCloseIconHovered;
  }

}
