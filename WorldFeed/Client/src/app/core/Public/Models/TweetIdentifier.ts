import {ITweetIdentifier} from "./Interfaces/ITweetIdentifier";

export class TweetIdentifier implements ITweetIdentifier {
  constructor(tweetId: number) {
    this.id = tweetId;
    this.idStr = tweetId.toString(CultureInfo.InvariantCulture);
  }

  public id: number;
  public idStr: string;

  public ToString(): string {
    return this.idStr ?? this.id.toString();
  }
}
