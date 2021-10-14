import {IPollOption} from "./poll-option";

export interface IPoll {
  id: number;

  question: string;

  answers: IPollOption[];

  expiresAt: Date;

  expired: boolean;

  multiple: boolean;

  totalVotes: number;

  votersCount: number;

  alreadyVoted: true;

  ownVotes: number[];

  views: number;

  startDateUtc: Date;
}
