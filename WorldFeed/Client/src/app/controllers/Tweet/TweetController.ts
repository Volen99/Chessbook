import {ITweetController} from "../../core/Core/Controllers/ITweetController";
import {IUploadQueryExecutor} from "../Upload/UploadQueryExecutor";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';
import { ITwitterRequest } from 'src/app/core/Public/Models/Interfaces/ITwitterRequest';
import {TwitterRequest} from "../../core/Public/TwitterRequest";

export class TweetController implements ITweetController
    {
        private readonly _tweetQueryExecutor: ITweetQueryExecutor;
        private readonly _uploadQueryExecutor: IUploadQueryExecutor;
        private readonly _pageCursorIteratorFactories: IPageCursorIteratorFactories;

        constructor(tweetQueryExecutor: ITweetQueryExecutor, uploadQueryExecutor: IUploadQueryExecutor,
                    pageCursorIteratorFactories: IPageCursorIteratorFactories)
        {
            this._tweetQueryExecutor = tweetQueryExecutor;
            this._uploadQueryExecutor = uploadQueryExecutor;
            this._pageCursorIteratorFactories = pageCursorIteratorFactories;
        }

        public getTweetAsync(parameters: IGetTweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>>
    {
            return this._tweetQueryExecutor.GetTweetAsync(parameters, request);
        }

        public  getTweetsAsync(parameters: IGetTweetsParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>>
        {
            return this._tweetQueryExecutor.GetTweetsAsync(parameters, request);
        }

        public async publishTweetAsync(parameters: IPublishTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>>
    {
            parameters.MediaIds.AddRange(parameters.Medias.Select(x => x.UploadedMediaInfo.MediaId));
            return await this._tweetQueryExecutor.PublishTweetAsync(parameters, request).ConfigureAwait(false);
        }

        public  canBePublished(publishTweetParameters: IPublishTweetParameters): boolean
        {
            return true;
            //return WorldFeedConsts.MAX_TWEET_SIZE >= EstimateTweetLength(publishTweetParameters);
        }

        public canBePublished(text: string): boolean {
            return true;
            //return WorldFeedConsts.MAX_TWEET_SIZE >= EstimateTweetLength(text);
        }

        public static  EstimateTweetLength(text: string): number
        {
            var parameters = new PublishTweetParameters(text);
            return EstimateTweetLength(parameters);
        }

        private static  EstimateTweetLength(publishTweetParameters: IPublishTweetParameters): number
        {
            var text = publishTweetParameters.Text ?? "";
// #pragma warning disable 618
            var textLength = StringExtension.EstimateTweetLength(text);

            if (publishTweetParameters.QuotedTweet != null)
            {
                textLength = StringExtension.EstimateTweetLength(text.TrimEnd()) +
                             1 + // for the space that needs to be added before the link to quoted tweet.
                             TweetinviConsts.MEDIA_CONTENT_SIZE;
// #pragma warning restore 618
            }

            if (publishTweetParameters.HasMedia)
            {
                textLength += TweetinviConsts.MEDIA_CONTENT_SIZE;
            }

            return textLength;
        }

        // Retweets - Publish
        public  publishRetweetAsync(parameters: IPublishRetweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>>
        {
            return this._tweetQueryExecutor.PublishRetweetAsync(parameters, request);
        }

        // Retweets - Destroy

        public destroyRetweetAsync(parameters: IDestroyRetweetParameters, request: ITwitterRequest):  Task<ITwitterResult<ITweetDTO>>
        {
            return this._tweetQueryExecutor.DestroyRetweetAsync(parameters, request);
        }

        // #region GetRetweets

        public  getRetweetsAsync(parameters: IGetRetweetsParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>>
        {
            return this._tweetQueryExecutor.GetRetweetsAsync(parameters, request);
        }

        // #endregion

        public getRetweeterIdsIterator(parameters: IGetRetweeterIdsParameters, request: ITwitterRequest):  ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>
        {
            return this._pageCursorIteratorFactories.create(parameters, cursor =>
            {
                var cursoredParameters = new GetRetweeterIdsParameters(parameters)
                {
                    Cursor = cursor
                };

                return this._tweetQueryExecutor.GetRetweeterIdsAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        // Destroy Tweet
        public  destroyTweetAsync(parameters: IDestroyTweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>>
        {
            return this._tweetQueryExecutor.DestroyTweetAsync(parameters, request);
        }

        // Favorite Tweet
        public getFavoriteTweetsIterator(parameters: IGetUserFavoriteTweetsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> // long?
{
            return this._pageCursorIteratorFactories.create(parameters, cursor =>
            {
                var cursoredParameters = new GetUserFavoriteTweetsParameters(parameters)
                {
                    MaxId = cursor
                };

                return this._tweetQueryExecutor.GetFavoriteTweetsAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public  favoriteTweetAsync(parameters: IFavoriteTweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>>
        {
            return this._tweetQueryExecutor.FavoriteTweetAsync(parameters, request);
        }

        public  unfavoriteTweetAsync(parameters: IUnfavoriteTweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>>
        {
            return this._tweetQueryExecutor.UnfavoriteTweetAsync(parameters, request);
        }

        public getOEmbedTweetAsync(parameters: IGetOEmbedTweetParameters, request: ITwitterRequest):  Task<ITwitterResult<IOEmbedTweetDTO>>
        {
            return this._tweetQueryExecutor.GetOEmbedTweetAsync(parameters, request);
        }
    }
