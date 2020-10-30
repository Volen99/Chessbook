import {InjectionToken} from "@angular/core";

import {IObjectEntities} from "./IObjectEntities";
import {TweetEntitiesDTO} from "../../../Core/DTO/TweetEntitiesDTO";

// Entities are special elements that can be given to an ITweet
export interface ITweetEntities extends IObjectEntities {
}

export const ITweetEntitiesToken = new InjectionToken<ITweetEntities>('ITweetEntities', {
  providedIn: 'root',
  factory: () => new TweetEntitiesDTO(),
});
