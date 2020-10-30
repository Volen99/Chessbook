import {InjectionToken} from "@angular/core";

import {ITwitterIdentifier} from "./ITwitterIdentifier";
import {TweetIdentifier} from "../TweetIdentifier";

// Identifier allowing to identify a unique tweet.
export interface ITweetIdentifier extends ITwitterIdentifier {
}

export const ITweetIdentifierToken = new InjectionToken<ITweetIdentifier>('ITweetIdentifier', {
  providedIn: 'root',
  factory: () => new TweetIdentifier(0),
});
