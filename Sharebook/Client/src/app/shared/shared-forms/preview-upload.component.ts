import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ServerService} from "../../core/server";
import {ServerConfig} from "../models/server/server-config.model";
import {BytesPipe} from "../main/angular/bytes.pipe";

@Component({
  selector: 'my-preview-upload',
  styleUrls: ['./preview-upload.component.scss'],
  templateUrl: './preview-upload.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PreviewUploadComponent),
      multi: true
    }
  ]
})
export class PreviewUploadComponent implements OnInit, ControlValueAccessor {
  @Input() inputLabel: string;
  @Input() inputName: string;
  @Input() previewWidth: string;
  @Input() previewHeight: string;

  imageSrc: SafeResourceUrl;
  allowedExtensionsMessage = '';
  maxSizeText: string;

  private serverConfig: ServerConfig;
  private bytesPipe: BytesPipe;
  private file: Blob;

  constructor(
    private sanitizer: DomSanitizer,
    private serverService: ServerService
  ) {
    this.bytesPipe = new BytesPipe();
    this.maxSizeText = $localize`max size`;
  }

  get videoImageExtensions() {
    return this.serverConfig.video.image.extensions;
  }

  get maxVideoImageSize() {
    return this.serverConfig.video.image.size.max;
  }

  get maxVideoImageSizeInBytes() {
    return this.bytesPipe.transform(this.maxVideoImageSize);
  }

  ngOnInit() {
    this.serverConfig = this.serverService.getTmpConfig();
    this.serverService.getConfig()
      .subscribe(config => this.serverConfig = config);

    this.allowedExtensionsMessage = this.videoImageExtensions.join(', ');
  }

  onFileChanged(file: Blob) {
    this.file = file;

    this.propagateChange(this.file);
    this.updatePreview();
  }

  propagateChange = (_: any) => { /* empty */
  }

  writeValue(file: any) {
    this.file = file;
    this.updatePreview();
  }

  registerOnChange(fn: (_: any) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
    // Unused
  }

  private updatePreview() {
    if (this.file) {
      const url = URL.createObjectURL(this.file);
      this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
