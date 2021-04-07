import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../user/user.model";
import {ServerService} from "../../../core/server/server.service";
import {Notifier} from "../../../core/notification/notifier.service";
import {getBytes} from "../../../../root-helpers/bytes";
import {SharebookLimits} from "../../../helpers/sharebook-limits";

@Component({
  selector: 'my-actor-avatar-info',
  templateUrl: './actor-avatar-info.component.html',
  styleUrls: ['./actor-avatar-info.component.scss']
})
export class ActorAvatarInfoComponent implements OnInit, OnChanges {
  @ViewChild('avatarfileInput') avatarfileInput: ElementRef<HTMLInputElement>;
  @ViewChild('avatarPopover') avatarPopover: NgbPopover;

  @Input() actor: User;

  @Output() avatarChange = new EventEmitter<FormData>();
  @Output() avatarDelete = new EventEmitter<void>();

  avatarFormat = '';
  maxAvatarSize = SharebookLimits.UPLOAD_MAX_IMAGE_SIZE;
  avatarExtensions = ['.png', '.jpeg', '.jpg', '.gif'];

  private avatarUrl: string;

  constructor(private serverService: ServerService, private notifier: Notifier) {
  }

  ngOnInit(): void {
    // this.serverService.getConfig()
    //   .subscribe(config => {
    //     this.maxAvatarSize = config.avatar.file.size.max;
    //     this.avatarExtensions = config.avatar.file.extensions.join(', ');
    //
    //     this.avatarFormat = `${$localize`max size`}: 192*192px, ` +
    //       `${getBytes(this.maxAvatarSize)} ${$localize`extensions`}: ${this.avatarExtensions}`;
    //   });

    this.actor.picture = 'https://localhost:5001/Files/Avatars/sadness.jpg';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['actor']) {
      this.avatarUrl = User.GET_ACTOR_AVATAR_URL(this.actor);
    }
  }

  onAvatarChange(input: HTMLInputElement) {
    this.avatarfileInput = new ElementRef(input);

    const avatarfile = this.avatarfileInput.nativeElement.files[0];
    if (avatarfile.size > this.maxAvatarSize) {
      this.notifier.error('Error', $localize`This image is too large.`);
      return;
    }

    const formData = new FormData();
    formData.append('avatarfile', avatarfile);
    this.avatarPopover?.close();
    this.avatarChange.emit(formData);
  }

  deleteAvatar() {
    this.avatarDelete.emit();
  }

  hasAvatar() {
    return !!this.avatarUrl;
  }
}
