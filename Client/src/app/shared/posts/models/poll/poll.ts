import {IPollOption} from "./poll-option";

export interface IPoll {
  id: number;

  question: string;

  options: IPollOption[];

  expires_at: Date;

  expired: boolean;

  multiple: boolean;

  votes_count: number;

  voters_count: number;

  voted: true;

  own_votes: number[];

  startDateUtc: Date;
}
