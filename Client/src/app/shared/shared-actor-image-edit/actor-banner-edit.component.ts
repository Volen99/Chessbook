import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';

import {getBytes} from "../../../root-helpers/bytes";
import {ServerService} from "../../core/server/server.service";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {User} from "../shared-main/user/user.model";

import {faPen, faCamera, faFileImport, faTrashAlt} from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'my-actor-banner-edit',
  templateUrl: './actor-banner-edit.component.html',
  styleUrls: [
    './actor-image-edit.scss',
    './actor-banner-edit.component.scss'
  ]
})
export class ActorBannerEditComponent implements OnInit {
  @ViewChild('bannerfileInput') bannerfileInput: ElementRef<HTMLInputElement>;
  @ViewChild('bannerPopover') bannerPopover: NgbPopover;

  @Input() actor: User; // Channel
  @Input() previewImage = false;

  @Output() bannerChange = new EventEmitter<FormData>();
  @Output() bannerDelete = new EventEmitter<void>();

  bannerFormat = '';
  maxBannerSize = 1024 * 1024 * 2;
  bannerExtensions = ['.png', '.jpeg', '.jpg', '.gif', '.webp'];

  preview: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private serverService: ServerService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.bannerFormat = `ratio 3:1, recommended size: 1500x500, max size: ${getBytes(this.maxBannerSize)}, extensions: ${this.bannerExtensions}`;
  }

  faPen = faPen;
  faFileImport = faFileImport;
  faTrashAlt = faTrashAlt;
  faCamera = faCamera;

  onBannerChange(input: HTMLInputElement) {
    this.bannerfileInput = new ElementRef(input);

    const bannerfile = this.bannerfileInput.nativeElement.files[0];
    if (bannerfile.size > this.maxBannerSize) {
      this.toastrService.danger('This image is too large.', `Error`);
      return;
    }

    const formData = new FormData();
    formData.append('bannerfile', bannerfile);
    this.bannerPopover?.close();
    this.bannerChange.emit(formData);

    if (this.previewImage) {
      this.preview = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(bannerfile));
    }
  }

  deleteBanner() {
    this.preview = undefined;
    this.bannerDelete.emit();
  }

  hasBanner() {
    return !!this.preview || !this.actor.profileBannerURL.includes('default-banner');
  }
}
