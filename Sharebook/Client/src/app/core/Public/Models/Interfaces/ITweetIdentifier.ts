import {InjectionToken} from "@angular/core";

import {ITwitterIdentifier} from "./ITwitterIdentifier";
import {TweetIdentifier} from "../TweetIdentifier";
import {AppInjector} from "../../../../sharebook/Injectinvi/app-injector";

// Identifier allowing to identify a unique tweet.
export interface ITweetIdentifier extends ITwitterIdentifier {
}

export const ITweetIdentifierToken = new InjectionToken<ITweetIdentifier>('ITweetIdentifier', {
  providedIn: 'root',
  factory: () => AppInjector.get(TweetIdentifier)
});
