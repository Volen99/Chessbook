import {Inject, InjectionToken} from "@angular/core";

import {ITweet} from "./ITweet";
import {Mention} from "../../../Core/Models/Mention";
import {TweetMode} from "../../Settings/SharebookSettings";
import {TweetDTO} from "../../../Core/DTO/TweetDTO";
import {TwitterClient} from "../../../../sharebook/TwitterClient";
import {AppInjector} from "../../../../sharebook/Injectinvi/app-injector";

// Twitter mention
export interface IMention extends ITweet {  // Notice that IMention inherits from ITweet
  // Mention annotation
  annotations: string;
}

export const IMentionToken = new InjectionToken<IMention>('IMention', {
  providedIn: 'root',
  factory: () => AppInjector.get(Mention),
});
