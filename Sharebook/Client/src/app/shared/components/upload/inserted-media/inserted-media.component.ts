import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {FileUploader} from "../../../../global-modules/upload/file-uploader.class";
import {FileItem} from "../../../../global-modules/upload/file-item.class";

@Component({
  selector: 'app-inserted-media',
  templateUrl: './inserted-media.component.html',
  styleUrls: ['../../../../../assets/css/site.css', '../upload.component.css', './inserted-media.component.css']
})
export class InsertedMediaComponent implements OnInit {
  @Input() public uploader: FileUploader;

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

  public removeMedia(item: FileItem, length: number) {
    item.remove();
  }

}
