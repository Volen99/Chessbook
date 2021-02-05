import {Component, Input, OnInit} from '@angular/core';
import {FileItem} from "../file-item.class";

@Component({
  selector: 'app-media-group',
  templateUrl: './media-group.component.html',
  styleUrls: ['./media-group.component.scss']
})
export class MediaGroupComponent implements OnInit {
  @Input() media: FileItem;

  constructor() { }

  ngOnInit(): void {
  }

  public isCloseIconHovered = false;

  handleCloseIconHover(event: MouseEvent) {
    this.isCloseIconHovered = !this.isCloseIconHovered;
  }

}
