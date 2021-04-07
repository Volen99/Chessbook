import {ITweetIdentifier} from "../posts/models/tweet-identifier";

export class TweetIdentifier implements ITweetIdentifier {
  constructor(tweetId: number) {
    this.id = tweetId;
    this.idStr = tweetId.toString(/*CultureInfo.InvariantCulture*/);
  }

  public id: number;
  public idStr: string;

  public toString(): string {
    return this.idStr ?? this.id.toString();
  }
}
