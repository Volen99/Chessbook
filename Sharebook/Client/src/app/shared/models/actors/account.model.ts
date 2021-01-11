import {Actor} from './actor.model';
import {Avatar} from "../avatars/avatar.model";

export interface Account extends Actor {
  displayName: string;
  description: string;

  userId?: number;
}

export interface AccountSummary {
  id: number;
  name: string;
  displayName: string;
  url: string;
  host: string;
  avatar?: Avatar;
}
