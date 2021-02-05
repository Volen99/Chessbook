import {inject, Inject, Injectable, InjectionToken} from "@angular/core";

import {ITweetsClientParametersValidator} from "./tweets-client-parameters-validator";
import {IGetRetweetsParameters} from "../parameters/get-retweets-parameters";
import {IDestroyTweetParameters} from "../parameters/destroy-tweet-parameters";
import {IPublishRetweetParameters} from "../parameters/publish-retweet-parameters";
import {IDestroyRetweetParameters} from "../parameters/destroy-retweet-parameters";
import {IFavoriteTweetParameters} from "../parameters/favorite-tweet-parameters";
import {IUnfavoriteTweetParameters} from "../parameters/unfavorite-tweet-parameters";
import {IGetOEmbedTweetParameters} from "../parameters/get-OEmbed-tweet-parameters";
import {ITweetIdentifier} from "../models/tweet-identifier";
import {IGetTweetsParameters} from "../parameters/get-tweets-parameters";
import {IPublishTweetParameters} from "../parameters/publish-tweet-parameters";
import {IGetUserFavoriteTweetsParameters} from "../parameters/get-favorite-tweets-Parameters";
import {IGetRetweeterIdsParameters} from "../parameters/get-retweeter-ids-parameters";
import {IGetTweetParameters} from "../parameters/get-tweet-parameters";


export interface ITweetsClientRequiredParametersValidator extends ITweetsClientParametersValidator {
}

type ParametersForThrowIfTweetBad = IDestroyTweetParameters
    | IGetRetweetsParameters
    | IPublishRetweetParameters
    | IDestroyRetweetParameters
    | IFavoriteTweetParameters
    | IUnfavoriteTweetParameters
    | IGetOEmbedTweetParameters;

export type TweetsParameters = IGetTweetParameters
    | IGetTweetsParameters
    | IPublishTweetParameters
    | IDestroyTweetParameters
    | IGetUserFavoriteTweetsParameters
    | IGetRetweetsParameters
    | IPublishRetweetParameters
    | IDestroyRetweetParameters
    | IGetRetweeterIdsParameters
    | IFavoriteTweetParameters
    | IUnfavoriteTweetParameters
    | IGetOEmbedTweetParameters;

@Injectable()
export class TweetsClientRequiredParametersValidator implements ITweetsClientRequiredParametersValidator {
    // private readonly _userQueryValidator: IUserQueryValidator;

    constructor() {
    }

    public validate(parameters: TweetsParameters): void {
        if (parameters == null) {
            throw new Error(`nameof(parameters)`);
        }

        if (this.isParametersForThrowIfTweetBad(parameters)) {
            this.throwIfTweetCannotBeUsed(parameters.tweet, `${`nameof(parameters.tweet)`}`);
        } else if (this.isIGetTweetsParameters(parameters)) {
            if (parameters.tweets == null) {
                throw new Error('ArgumentNull_Generic');
            }

            if (parameters.tweets.length === 0) {
                throw new Error("You need at least 1 tweet id ${nameof(parameters.tweets)}");
            }

            let validTweetIdentifiers = parameters.tweets.filter(x => x?.id != null || !!x?.idStr);

            if (!(validTweetIdentifiers.length > 0)) {
                throw new Error("There are no valid tweet identifiers, ${nameof(parameters.tweets)}");
            }
        } else if (this.isIPublishTweetParameters(parameters)) {
            if (parameters.inReplyToTweet != null) {
                this.throwIfTweetCannotBeUsed(parameters.inReplyToTweet);
            }

            if (parameters.quotedTweet != null) {
                this.throwIfTweetCannotBeUsed(parameters.quotedTweet);
            }

            if (parameters.medias.some(x => !x.hasBeenUploaded)) {
                throw new Error("Some media were not uploaded, ${nameof(parameters.medias)}");
            }
        } else if (this.isIGetUserFavoriteTweetsParameters(parameters)) {
            // this._userQueryValidator.throwIfUserCannotBeIdentified(parameters.user, `${`nameof(parameters.user)`}`);
            throw  Error();
        }
    }

    public throwIfTweetCannotBeUsed(tweet: ITweetIdentifier, parameterName?: string): void {
        if (!parameterName) {
            parameterName = `${`nameof(tweet)`}.${`nameof(tweet.id)`}`;
        }

        if (tweet == null) {
            throw new Error(`${`nameof(tweet)`}`);
        }

        if (!this.isValidTweetIdentifier(tweet)) {
            throw new Error(parameterName);
        }
    }

    private isValidTweetIdentifier(tweetIdentifier: ITweetIdentifier): boolean {
        return tweetIdentifier != null && tweetIdentifier.id > 0;
    }

    private isParametersForThrowIfTweetBad(parameters: TweetsParameters): parameters is ParametersForThrowIfTweetBad {
        return (parameters as ParametersForThrowIfTweetBad).tweet !== undefined;
    }

    private isIGetTweetsParameters(parameters: TweetsParameters): parameters is IGetTweetsParameters {
        return (parameters as IGetTweetsParameters).includeCardUri !== undefined;
    }

    private isIPublishTweetParameters(parameters: TweetsParameters): parameters is IPublishTweetParameters {
        return (parameters as IPublishTweetParameters).medias !== undefined;
    }

    private isIGetUserFavoriteTweetsParameters(parameters: TweetsParameters): parameters is IGetUserFavoriteTweetsParameters {
        return (parameters as IGetUserFavoriteTweetsParameters).includeEntities !== undefined;
    }
}
