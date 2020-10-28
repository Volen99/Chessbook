import {ITweet} from "./ITweet";
import {Inject, InjectionToken} from "@angular/core";
import {Mention} from "../../../Core/Models/Mention";
import {TweetMode} from "../../Settings/TweetinviSettings";
import {TweetDTO} from "../../../Core/DTO/TweetDTO";
import {TwitterClient} from "../../../../sharebook/TwitterClient";

// Twitter mention
export interface IMention extends ITweet {  // Notice that IMention inherits from ITweet
  // Mention annotation
  annotations: string;
}

export const IMentionToken = new InjectionToken<IMention>('IMention', {
  providedIn: 'root',
  factory: () => new Mention(Inject(TweetDTO), Inject(TweetMode), Inject(TwitterClient)),
});
