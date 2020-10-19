import { IStreamsClient } from 'src/app/core/Public/Client/Clients/IStreamsClient';

 export class StreamsClient implements IStreamsClient
    {
        private readonly _client: ITwitterClient;
        private readonly _sampleStreamFactory: IFactory<ISampleStream>;
        private readonly _filteredStreamFactory: IFactory<IFilteredStream>;
        private readonly _trackedStreamFactory: IFactory<ITrackedStream>;
        private readonly _tweetStreamFactory: IFactory<ITweetStream>;

        constructor(client: ITwitterClient, sampleStreamFactory: IFactory<ISampleStream>,
                    filteredStreamFactory: IFactory<IFilteredStream>,
                    trackedStreamFactory: IFactory<ITrackedStream>,
                    tweetStreamFactory: IFactory<ITweetStream>)
        {
            this._client = client;
            this._sampleStreamFactory = sampleStreamFactory;
            this._filteredStreamFactory = filteredStreamFactory;
            this._trackedStreamFactory = trackedStreamFactory;
            this._tweetStreamFactory = tweetStreamFactory;
        }

        public createSampleStream(): ISampleStream
        {
            return CreateSampleStream(new CreateSampleStreamParameters());
        }

        public  createSampleStream(parameters: ICreateSampleStreamParameters): ISampleStream
        {
            parameters ??= new CreateSampleStreamParameters();
            let customRequestParameters = this._sampleStreamFactory.GenerateParameterOverrideWrapper("createSampleStreamParameters", parameters);
            let stream = this._sampleStreamFactory.Create(customRequestParameters);
            stream.TweetMode = parameters.tweetMode ?? this._client.config.tweetMode;
            return stream;
        }

        public createFilteredStream(): IFilteredStream
        {
            return CreateFilteredStream(new CreateFilteredTweetStreamParameters());
        }

        public  createFilteredStream(parameters: ICreateFilteredTweetStreamParameters): IFilteredStream
        {
            parameters ??= new CreateFilteredTweetStreamParameters();
            let customRequestParameters = this._filteredStreamFactory.GenerateParameterOverrideWrapper("createFilteredTweetStreamParameters", parameters);
            let stream = this._filteredStreamFactory.Create(customRequestParameters);
            stream.TweetMode = parameters.tweetMode ?? this._client.config.tweetMode;
            return stream;
        }

        public  createTweetStream(): ITweetStream
        {
            return CreateTweetStream(new CreateTweetStreamParameters());
        }

        public  createTweetStream(parameters: ICreateTweetStreamParameters): ITweetStream
        {
            parameters ??= new CreateTweetStreamParameters();
            let customRequestParameters = this._tweetStreamFactory.GenerateParameterOverrideWrapper("createTweetStreamParameters", parameters);
            let stream = this._tweetStreamFactory.Create(customRequestParameters);
            stream.TweetMode = parameters.tweetMode ?? this._client.config.tweetMode;
            return stream;
        }

        public  createTrackedTweetStream(): ITrackedStream
        {
            return CreateTrackedTweetStream(new CreateTrackedTweetStreamParameters());
        }

        public  createTrackedTweetStream(parameters: ICreateTrackedTweetStreamParameters): ITrackedStream
        {
            parameters ??= new CreateTrackedTweetStreamParameters();
            let customRequestParameters = this._trackedStreamFactory.GenerateParameterOverrideWrapper("createTrackedTweetStreamParameters", parameters);
            let stream = this._trackedStreamFactory.Create(customRequestParameters);
            stream.TweetMode = parameters.tweetMode ?? this._client.config.tweetMode;
            return stream;
        }
    }
