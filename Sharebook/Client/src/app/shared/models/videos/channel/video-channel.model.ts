import {Account} from '../../actors/account.model';
import {Actor} from "../../actors/actor.model";
import {Avatar} from "../../avatars/avatar.model";

export type ViewsPerDate = {
  date: Date;
  views: number;
};

export interface VideoChannel extends Actor {
  displayName: string;
  description: string;
  support: string;
  isLocal: boolean;
  ownerAccount?: Account;

  videosCount?: number;
  viewsPerDay?: ViewsPerDate[]; // chronologically ordered
}

export interface VideoChannelSummary {
  id: number;
  name: string;
  displayName: string;
  url: string;
  host: string;
  avatar?: Avatar;
}
