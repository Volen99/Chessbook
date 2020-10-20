import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {IUserIdentifier} from "../../../core/Public/Models/Interfaces/IUserIdentifier";
import {ITweetsClient} from "../../../core/Public/Client/Clients/ITweetsClient";
import {ITwitterClient} from "../../../core/Public/ITwitterClient";
import {ITweetsRequester} from "../../../core/Public/Client/Requesters/ITweetsRequester";
import {ITweetsClientParametersValidator} from "../../../core/Core/Client/Validators/TweetsClientParametersValidator";
import {ITweet} from "../../../core/Public/Models/Interfaces/ITweet";
import {GetTweetParameters, IGetTweetParameters} from "../../../core/Public/Parameters/TweetsClient/GetTweetParameters";
import {ITweetIdentifier} from "../../../core/Public/Models/Interfaces/ITweetIdentifier";
import {GetTweetsParameters, IGetTweetsParameters} from "../../../core/Public/Parameters/TweetsClient/GetTweetsParameters";
import {IPublishTweetParameters, PublishTweetParameters} from "../../../core/Public/Parameters/TweetsClient/PublishTweetParameters";
import {DestroyTweetParameters, IDestroyTweetParameters} from "../../../core/Public/Parameters/TweetsClient/DestroyTweetParameters";
import {ITweetDTO} from "../../../core/Public/Models/Interfaces/DTO/ITweetDTO";
import {GetRetweetsParameters, IGetRetweetsParameters} from "../../../core/Public/Parameters/TweetsClient/GetRetweetsParameters";
import {IPublishRetweetParameters, PublishRetweetParameters} from "../../../core/Public/Parameters/TweetsClient/PublishRetweetParameters";
import {DestroyRetweetParameters, IDestroyRetweetParameters} from "../../../core/Public/Parameters/TweetsClient/DestroyRetweetParameters";
import {
  GetRetweeterIdsParameters,
  IGetRetweeterIdsParameters
} from "../../../core/Public/Parameters/TweetsClient/GetRetweeterIdsParameters";
import {ITwitterIterator} from "../../../core/Public/Iterators/ITwitterIterator";
import {TwitterIteratorProxy} from "../../../core/Core/Iterators/TwitterIteratorProxy";
import {IIdsCursorQueryResultDTO} from "../../../core/Public/Models/Interfaces/DTO/QueryDTO/IIdsCursorQueryResultDTO";
import {
  GetUserFavoriteTweetsParameters,
  IGetUserFavoriteTweetsParameters
} from "../../../core/Public/Parameters/TweetsClient/GetFavoriteTweetsParameters";
import {FavoriteTweetParameters, IFavoriteTweetParameters} from "../../../core/Public/Parameters/TweetsClient/FavoriteTweetParameters";
import {
  IUnfavoriteTweetParameters,
  UnfavoriteTweetParameters
} from "../../../core/Public/Parameters/TweetsClient/UnFavoriteTweetParameters";
import {IOEmbedTweet} from "../../../core/Public/Models/Interfaces/IOEmbedTweet";
import {GetOEmbedTweetParameters, IGetOEmbedTweetParameters} from "../../../core/Public/Parameters/TweetsClient/GetOEmbedTweetParameters";
import {TwitterException} from "../../../core/Public/Exceptions/TwitterException";

export class TweetsClient implements ITweetsClient {
  private readonly _client: ITwitterClient;
  private readonly _tweetsRequester: ITweetsRequester;

  constructor(client: ITwitterClient) {
    this._client = client;
    this._tweetsRequester = client.raw.tweets;
  }

  get parametersValidator(): ITweetsClientParametersValidator {
    return this._client.parametersValidator;
  }

  // Tweets

  public async getTweetAsync(tweetIdOrParameters: number | IGetTweetParameters): Promise<ITweet> {
    let parameters: IGetTweetParameters;
    if (this.isIGetTweetParameters(tweetIdOrParameters)) {
      parameters = tweetIdOrParameters;
    } else {
      parameters = new GetTweetParameters(tweetIdOrParameters);
    }

    let twitterResult = await this._tweetsRequester.getTweetAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createTweet(twitterResult?.model);
  }

  public async getTweetsAsync(tweetIdsOrTweetsOrParameters: number[] | ITweetIdentifier[] | IGetTweetsParameters): Promise<ITweet[]> {
    let parameters: IGetTweetsParameters;
    if (this.isIGetTweetsParameters(tweetIdsOrTweetsOrParameters)) {
      parameters = tweetIdsOrTweetsOrParameters;
    } else {
      parameters = new GetTweetsParameters(tweetIdsOrTweetsOrParameters);
    }

    if (parameters.tweets == null || parameters.tweets.length === 0) {
      return new Array<ITweet>(0);    // new ITweet[0];
    }

    let requestResult = await this._tweetsRequester.getTweetsAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createTweets(requestResult?.model);
  }


  // Tweets - Publish

  public async publishTweetAsync(textOrParameters: string | IPublishTweetParameters): Promise<ITweet> {
    let parameters: IPublishTweetParameters;
    if (this.isIPublishTweetParameters(textOrParameters)) {
      parameters = textOrParameters;
    } else {
      parameters = new PublishTweetParameters(textOrParameters);
    }

    let requestResult = await this._tweetsRequester.publishTweetAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createTweet(requestResult?.model);
  }

  // Tweets - Destroy

  public async destroyTweetAsync(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters: number
    | ITweetIdentifier | ITweet | ITweetDTO | IDestroyTweetParameters): Promise<void> {
    let parameters: IDestroyTweetParameters;
    if (this.isIDestroyTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters)) {
      parameters = tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters;
    } else if (this.isTweet(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters)) {
      parameters = new DestroyTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters.tweetDTO); // .ConfigureAwait(false);
    } else {
      parameters = new DestroyTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters);
    }

    await this._tweetsRequester.destroyTweetAsync(parameters); // .ConfigureAwait(false);
  }

  // Retweets

  public async getRetweetsAsync(tweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IGetRetweetsParameters): Promise<ITweet[]> {
    let parameters: IGetRetweetsParameters;
    if (this.isIGetRetw♦eetsParameters(tweetIdOrTweetIdentifierOrParameters)) {
      parameters = tweetIdOrTweetIdentifierOrParameters;
    } else {
      parameters = new GetRetweetsParameters(tweetIdOrTweetIdentifierOrParameters);
    }

    let requestResult = await this._tweetsRequester.getRetweetsAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createTweets(requestResult?.model);
  }

  public async publishRetweetAsync(tweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IPublishRetweetParameters): Promise<ITweet> {
    let parameters: IPublishRetweetParameters;
    if (this.isIPublishRetweetParameters(tweetIdOrTweetIdentifierOrParameters)) {
      parameters = tweetIdOrTweetIdentifierOrParameters;
    } else {
      parameters = new PublishRetweetParameters(tweetIdOrTweetIdentifierOrParameters);
    }

    let requestResult = await this._tweetsRequester.gublishRetweetAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createTweet(requestResult?.model);
  }

  public destroyRetweetAsync(retweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IDestroyRetweetParameters): Promise<void> {
    let parameters: IDestroyRetweetParameters;
    if (this.isIDestroyRetweetParameters(retweetIdOrTweetIdentifierOrParameters)) {
      parameters = retweetIdOrTweetIdentifierOrParameters;
    } else {
      parameters = new DestroyRetweetParameters(retweetIdOrTweetIdentifierOrParameters);
    }

    await this._tweetsRequester.destroyRetweetAsync(parameters); // .ConfigureAwait(false);
  }

  public async getRetweeterIdsAsync(tweetIdOrTweetIdentifierOrParametersOr: number | ITweetIdentifier | IGetRetweeterIdsParameters): Promise<number[]> {
    let parameters: IGetRetweeterIdsParameters;
    if (this.isIGetRetweeterIdsParameters(tweetIdOrTweetIdentifierOrParametersOr)) {
      parameters = tweetIdOrTweetIdentifierOrParametersOr;
    } else {
      parameters = new GetRetweeterIdsParameters(tweetIdOrTweetIdentifierOrParametersOr);
    }

    let iterator = this.getRetweeterIdsIterator(parameters);
    return (await iterator.nextPageAsync()); // .ConfigureAwait(false)).ToArray();
  }

  public getRetweeterIdsIterator(tweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IGetRetweeterIdsParameters): ITwitterIterator<number> {
    let parameters: IGetRetweeterIdsParameters;
    if (this.isIGetRetweeterIdsParameters(tweetIdOrTweetIdentifierOrParameters)) {
      parameters = tweetIdOrTweetIdentifierOrParameters;
    } else {
      parameters = new GetRetweeterIdsParameters(tweetIdOrTweetIdentifierOrParameters);
    }

    let twitterResultIterator = this._tweetsRequester.getRetweeterIdsIterator(parameters);
    return new TwitterIteratorProxy<ITwitterResult<IIdsCursorQueryResultDTO>, number>(twitterResultIterator, dto => dto.model.ids);
  }

  public async getUserFavoriteTweetsAsync(userIdOrUsernameOrUserIdentifierOrParameters: number | string
    | IUserIdentifier | IGetUserFavoriteTweetsParameters): Promise<ITweet[]> {
    let parameters: IGetUserFavoriteTweetsParameters;
    if (this.isIGetUserFavoriteTweetsParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
      parameters = userIdOrUsernameOrUserIdentifierOrParameters;
    } else {
      parameters = new GetUserFavoriteTweetsParameters(userIdOrUsernameOrUserIdentifierOrParameters);
    }

    let iterator = this.getUserFavoriteTweetsIterator(parameters);
    return (await iterator.nextPageAsync()); // .ConfigureAwait(false)).ToArray();
  }

  // #region Favorite Tweets
  public getUserFavoriteTweetsIterator(userIdOrUsernameOrUserIdentifierOrParameters: number | string
    | IUserIdentifier | IGetUserFavoriteTweetsParameters): ITwitterIterator<ITweet, number> {   // long?
    let parameters: IGetUserFavoriteTweetsParameters;
    if (this.isIGetUserFavoriteTweetsParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
      parameters = userIdOrUsernameOrUserIdentifierOrParameters;
    } else {
      parameters = new GetUserFavoriteTweetsParameters(userIdOrUsernameOrUserIdentifierOrParameters);
    }

    let favoriteTweetsIterator = this._tweetsRequester.getUserFavoriteTweetsIterator(parameters);
    return new TwitterIteratorProxy<ITwitterResult<ITweetDTO[]>, ITweet, number>(favoriteTweetsIterator,            // long?
      twitterResult => {
        return twitterResult.model.map(x => this._client.factories.createTweet(x)); // .ToArray();
      });
  }

  public async favoriteTweetAsync(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters: number
    | ITweetIdentifier | ITweet | ITweetDTO | IFavoriteTweetParameters): Promise<void> {
    let parameters: IFavoriteTweetParameters;
    if (this.isIFavoriteTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters)) {
      parameters = tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters;
    } else if (this.isTweet(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters) || this.isTweetDTO(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters)) {
      let tweetDTOCurrent: ITweetDTO;
      if (this.isTweet(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters)) {
        tweetDTOCurrent = tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters.tweetDTO;
      } else {
        tweetDTOCurrent = tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters;
      }

      try {
        parameters = new FavoriteTweetParameters(tweetDTOCurrent);
        await this._tweetsRequester.favoriteTweetAsync(parameters); // .ConfigureAwait(false);
        tweetDTOCurrent.favorited = true;

        return;
      } catch (ex: TwitterException) {
        let tweetWasAlreadyFavorited = ex.twitterExceptionInfos != null && ex.twitterExceptionInfos.Any() && ex.twitterExceptionInfos.First().Code === 139;
        if (tweetWasAlreadyFavorited) {
          tweetDTOCurrent.favorited = true;
          return;
        }

        throw;
      }
    } else {
      parameters = new FavoriteTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters);
    }

    await this._tweetsRequester.favoriteTweetAsync(parameters); // .ConfigureAwait(false);
  }

  public unfavoriteTweetAsync(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters: number
    | ITweetIdentifier | ITweet | ITweetDTO | IUnfavoriteTweetParameters): Promise<void> {
    let parameters: IUnfavoriteTweetParameters;
    if (this.isIUnfavoriteTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters)) {
      parameters = tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters;
    } else if (this.isTweet(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters) || this.isTweetDTO(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters)) {
      let tweetDTOCurrent: ITweetDTO;
      if (this.isTweet(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters)) {
        tweetDTOCurrent = tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters.tweetDTO;
      } else {
        tweetDTOCurrent = tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters;
      }

      parameters = new UnfavoriteTweetParameters(tweetDTOCurrent);
      await this._tweetsRequester.unfavoriteTweetAsync(parameters); // .ConfigureAwait(false);
      tweetDTOCurrent.favorited = false;

      return;
    } else {
      parameters = new DestroyTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters);
    }

    await this._tweetsRequester.unfavoriteTweetAsync(parameters); // .ConfigureAwait(false);
  }

  public async getOEmbedTweetAsync(tweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IGetOEmbedTweetParameters): Promise<IOEmbedTweet> {
    let parameters: IGetOEmbedTweetParameters;
    if (this.isIGetOEmbedTweetParameters(tweetIdOrTweetIdentifierOrParameters)) {
      parameters = tweetIdOrTweetIdentifierOrParameters;
    } else {
      parameters = new GetOEmbedTweetParameters(tweetIdOrTweetIdentifierOrParameters);
    }

    let twitterResult = await this._tweetsRequester.getOEmbedTweetAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createOEmbedTweet(twitterResult?.model);
  }

  // #endregion

  private isIGetTweetParameters(tweetIdOrParameters: number | IGetTweetParameters): tweetIdOrParameters is IGetTweetParameters {
    return (tweetIdOrParameters as IGetTweetParameters).includeCardUri !== undefined;
  }

  private isIGetTweetsParameters(tweetIdsOrTweetsOrParameters: number[] | ITweetIdentifier[] | IGetTweetsParameters): tweetIdsOrTweetsOrParameters is IGetTweetsParameters {
    return (tweetIdsOrTweetsOrParameters as IGetTweetsParameters).includeCardUri !== undefined;
  }

  private isIPublishTweetParameters(textOrParameters: string | IPublishTweetParameters): textOrParameters is IPublishTweetParameters {
    return (textOrParameters as IPublishTweetParameters).medias !== undefined;
  }

  private isTweet(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters: any): tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters is ITweet {
    return (tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters as ITweet).client !== undefined;
  }

  private isTweetDTO(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters: any): tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters is ITweetDTO {
    return (tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters as ITweetDTO).contributors !== undefined;
  }

  private isIDestroyTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters: number
    | ITweetIdentifier | ITweet | ITweetDTO | IDestroyTweetParameters): tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters is IDestroyTweetParameters {
    return (tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters as IDestroyTweetParameters).tweet !== undefined;
  }

  private isIGetRetweetsParameters(tweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IGetRetweetsParameters): tweetIdOrTweetIdentifierOrParameters is IGetRetweetsParameters {
    return (tweetIdOrTweetIdentifierOrParameters as IGetRetweetsParameters).pageSize !== undefined;
  }

  private isIPublishRetweetParameters(tweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IPublishRetweetParameters): tweetIdOrTweetIdentifierOrParameters is IPublishRetweetParameters {
    return (tweetIdOrTweetIdentifierOrParameters as IPublishRetweetParameters).trimUser !== undefined;
  }

  private isIDestroyRetweetParameters(retweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IDestroyRetweetParameters): retweetIdOrTweetIdentifierOrParameters is IDestroyRetweetParameters {
    return (retweetIdOrTweetIdentifierOrParameters as IDestroyRetweetParameters).trimUser !== undefined;
  }

  private isIGetRetweeterIdsParameters(tweetIdOrTweetIdentifierOrParametersOr: number | ITweetIdentifier | IGetRetweeterIdsParameters): tweetIdOrTweetIdentifierOrParametersOr is IGetRetweeterIdsParameters {
    return (tweetIdOrTweetIdentifierOrParametersOr as IGetRetweeterIdsParameters).tweet !== undefined;
  }

  private isIGetUserFavoriteTweetsParameters(userIdOrUsernameOrUserIdentifierOrParameters: number | string
    | IUserIdentifier | IGetUserFavoriteTweetsParameters): userIdOrUsernameOrUserIdentifierOrParameters is IGetUserFavoriteTweetsParameters {
    return (userIdOrUsernameOrUserIdentifierOrParameters as IGetUserFavoriteTweetsParameters).user !== undefined;
  }

  private isIFavoriteTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters: number
    | ITweetIdentifier | ITweet | ITweetDTO | IFavoriteTweetParameters): tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters is IFavoriteTweetParameters {
    return (tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters as IFavoriteTweetParameters).includeEntities !== undefined;
  }

  private isIUnfavoriteTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters: any): tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters is IUnfavoriteTweetParameters {
    return (tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters as IUnfavoriteTweetParameters).includeEntities !== undefined;
  }

  private isIGetOEmbedTweetParameters(tweetIdOrTweetIdentifierOrParameters: any): tweetIdOrTweetIdentifierOrParameters is IGetOEmbedTweetParameters {
    return (tweetIdOrTweetIdentifierOrParameters as IGetOEmbedTweetParameters).alignment !== undefined;
  }

}

