import {Injectable} from "@angular/core";

import {ITweetIdentifier} from "./Interfaces/ITweetIdentifier";

@Injectable({
  providedIn: 'root',
})
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
