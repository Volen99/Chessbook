import {Directive, EventEmitter, ElementRef, Input, HostListener, Output} from '@angular/core';

import {FileUploader} from "./file-uploader.class";

@Directive({selector: '[appFileSelect]'})
export class FileSelectDirective {
  @Input() public uploader: FileUploader;
  @Output() public onFileSelected: EventEmitter<File[]> = new EventEmitter<File[]>();

  public constructor(element: ElementRef) {
    this.element = element;
  }

  protected element: ElementRef;

  public getOptions(): any {
    return this.uploader.options;
  }

  public getFilters(): any {
    return {};
  }

  public isEmptyAfterSelection(): boolean {
    return !!this.element.nativeElement.attributes.multiple;
  }

  @HostListener('change')
  public onChange(): any {
    debugger
    let files = this.element.nativeElement.files;
    let options = this.getOptions();
    let filters = this.getFilters();

    this.uploader.addToQueue(files, options, filters);
    this.onFileSelected.emit(files);

    if (this.isEmptyAfterSelection()) {
      this.element.nativeElement.value = '';
    }
  }
}
