import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Account} from './account.model';
import {ServerConfig} from "../../models/server/server-config.model";
import {ServerService} from "../../../core/server";
import {Notifier} from "../../../core/notification/notifier-service";
import {getBytes} from "../../../../root-helpers/bytes";
import {VideoChannel} from "../video-channel/video-channel.model";

@Component({
  selector: 'my-actor-avatar-info',
  templateUrl: './actor-avatar-info.component.html',
  styleUrls: ['./actor-avatar-info.component.scss']
})
export class ActorAvatarInfoComponent implements OnInit {
  @ViewChild('avatarfileInput') avatarfileInput: ElementRef<HTMLInputElement>;

  @Input() actor: VideoChannel | Account;

  @Output() avatarChange = new EventEmitter<FormData>();

  private serverConfig: ServerConfig;

  constructor(private serverService: ServerService, private notifier: Notifier) {
  }

  ngOnInit(): void {
    this.serverConfig = this.serverService.getTmpConfig();
    this.serverService.getConfig()
      .subscribe(config => this.serverConfig = config);
  }

  onAvatarChange() {
    const avatarfile = this.avatarfileInput.nativeElement.files[0];
    if (avatarfile.size > this.maxAvatarSize) {
      this.notifier.error('Error', 'This image is too large.');
      return;
    }

    const formData = new FormData();
    formData.append('avatarfile', avatarfile);

    this.avatarChange.emit(formData);
  }

  get maxAvatarSize() {
    return this.serverConfig.avatar.file.size.max;
  }

  get maxAvatarSizeInBytes() {
    return getBytes(this.maxAvatarSize);
  }

  get avatarExtensions() {
    return this.serverConfig.avatar.file.extensions.join(', ');
  }

  get avatarFormat() {
    return `${$localize`max size`}: 192*192px, ${this.maxAvatarSizeInBytes} ${$localize`extensions`}: ${this.avatarExtensions}`;
  }
}
