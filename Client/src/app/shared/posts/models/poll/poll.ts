import {IPollOption} from "./poll-option";

export interface IPoll {
  id: number;

  question: string;

  options: IPollOption[];

  expires_at: Date;

  expired: boolean;

  multiple: boolean;

  votesCount: number;

  votersCount: number;

  voted: true;

  ownVotes: number[];

  startDateUtc: Date;
}
