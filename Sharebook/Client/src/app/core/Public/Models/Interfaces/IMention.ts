import {ITweet} from "./ITweet";
import {InjectionToken} from "@angular/core";
import {TweetIdentifier} from "../TweetIdentifier";

// Twitter mention
export interface IMention extends ITweet {  // Notice that IMention inherits from ITweet
  // Mention annotation
  annotations: string;
}

export const IMentionToken = new InjectionToken<IMention>('IMention', {
  providedIn: 'root',
  factory: () => new Mention(),
});
