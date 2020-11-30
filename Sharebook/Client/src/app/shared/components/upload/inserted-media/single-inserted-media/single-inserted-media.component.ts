import {Component, OnInit, Input} from '@angular/core';
import {FileItem} from "../../../../../global-modules/upload/file-item.class";

@Component({
  selector: 'app-single-inserted-media',
  templateUrl: './single-inserted-media.component.html',
  styleUrls: ['../../upload.component.css', '../inserted-media.component.css', './single-inserted-media.component.css']
})
export class SingleInsertedMediaComponent implements OnInit {
  @Input() item: FileItem;

  constructor() { }

  ngOnInit(): void {
  }

  public isCloseIconHovered = false;

  handleCloseIconHover(event: MouseEvent) {
    this.isCloseIconHovered = !this.isCloseIconHovered;
  }

}
