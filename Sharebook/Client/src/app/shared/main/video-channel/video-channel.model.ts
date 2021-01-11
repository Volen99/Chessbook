import {ViewsPerDate} from "../../models/videos/channel/video-channel.model";
import {Actor} from "../account/actor.model";
import {Avatar} from "../../models/avatars/avatar.model";
import {VideoChannel as ServerVideoChannel} from "../../../shared/models/videos/channel/video-channel.model";
import {Account} from '../../../shared/models/actors/account.model';

export class VideoChannel extends Actor implements ServerVideoChannel {
  displayName: string;
  description: string;
  support: string;
  isLocal: boolean;
  nameWithHost: string;
  nameWithHostForced: string;

  ownerAccount?: Account;
  ownerBy?: string;
  ownerAvatarUrl?: string;

  videosCount?: number;

  viewsPerDay?: ViewsPerDate[];

  static GET_ACTOR_AVATAR_URL(actor: object) {
    return Actor.GET_ACTOR_AVATAR_URL(actor) || this.GET_DEFAULT_AVATAR_URL();
  }

  static GET_DEFAULT_AVATAR_URL() {
    return `${window.location.origin}/src/assets/images/default-avatar-videochannel.png`;
  }

  constructor(hash: ServerVideoChannel) {
    super(hash);

    this.updateComputedAttributes();

    this.displayName = hash.displayName;
    this.description = hash.description;
    this.support = hash.support;
    this.isLocal = hash.isLocal;
    this.nameWithHost = Actor.CREATE_BY_STRING(this.name, this.host);
    this.nameWithHostForced = Actor.CREATE_BY_STRING(this.name, this.host, true);

    this.videosCount = hash.videosCount;

    if (hash.viewsPerDay) {
      this.viewsPerDay = hash.viewsPerDay.map(v => ({...v, date: new Date(v.date)}));
    }

    if (hash.ownerAccount) {
      this.ownerAccount = hash.ownerAccount;
      this.ownerBy = Actor.CREATE_BY_STRING(hash.ownerAccount.name, hash.ownerAccount.host);
      this.ownerAvatarUrl = Actor.GET_ACTOR_AVATAR_URL(this.ownerAccount);
    }
  }

  updateAvatar(newAvatar: Avatar) {
    this.avatar = newAvatar;

    this.updateComputedAttributes();
  }

  private updateComputedAttributes() {
    this.avatarUrl = VideoChannel.GET_ACTOR_AVATAR_URL(this);
  }
}
