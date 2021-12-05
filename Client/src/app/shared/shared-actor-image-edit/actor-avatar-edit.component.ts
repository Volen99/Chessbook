import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';

import {faPen, faCamera, faFileImport, faTrashAlt} from '@fortawesome/pro-light-svg-icons';

import {ServerService} from "../../core/server/server.service";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {getBytes} from "../../../root-helpers/bytes";
import {User} from "../shared-main/user/user.model";

@Component({
  selector: 'my-actor-avatar-edit',
  templateUrl: './actor-avatar-edit.component.html',
  styleUrls: [
    './actor-image-edit.scss',
    './actor-avatar-edit.component.scss'
  ]
})
export class ActorAvatarEditComponent implements OnInit {
  @ViewChild('avatarfileInput') avatarfileInput: ElementRef<HTMLInputElement>;
  @ViewChild('avatarPopover') avatarPopover: NgbPopover;

  @Input() actor: User;
  @Input() editable = true;
  @Input() displaySubscribers = true;
  @Input() displayUsername = true;
  @Input() previewImage = false;

  @Output() avatarChange = new EventEmitter<FormData>();
  @Output() avatarDelete = new EventEmitter<void>();

  avatarFormat = '';
  maxAvatarSize = 1024 * 1024 * 2;
  avatarExtensions = ['.png', '.jpeg', '.jpg'];

  preview: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private serverService: ServerService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.avatarFormat = `${`max size`}: 192*192px, ` +
      `${getBytes(this.maxAvatarSize)} ${`extensions`}: ${this.avatarExtensions}`;
  }

  faPen = faPen;
  faCamera = faCamera;
  faFileImport = faFileImport;
  faTrashAlt = faTrashAlt;

  onAvatarChange(input: HTMLInputElement) {
    this.avatarfileInput = new ElementRef(input);

    const avatarfile = this.avatarfileInput.nativeElement.files[0];
    if (avatarfile.size > this.maxAvatarSize) {
      this.toastrService.danger('Error', `This image is too large.`);
      return;
    }

    const formData = new FormData();
    formData.append('avatarfile', avatarfile);
    this.avatarPopover?.close();
    this.avatarChange.emit(formData);

    if (this.previewImage) {
      this.preview = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(avatarfile));
    }
  }

  deleteAvatar() {
    this.preview = undefined;
    this.avatarDelete.emit();
  }

  hasAvatar() {
    return !!this.preview || !this.actor.profileImageUrlHttps.includes('default-avatar');
  }

  isChannel() {
   // return !!(this.actor as VideoChannel).ownerAccount;

    return false;
  }

  getChannel(): User { // VideoChannel
    if (this.isChannel()) {
      return this.actor;
    }

    return undefined;
  }

  getAccount(): User {
    if (this.isChannel()) {
      return undefined;
    }

    return this.actor;
  }
}
