namespace WorldFeed.Common.Json
{
    using Newtonsoft.Json.Linq;
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;

    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Models.Authentication;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.Events;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;
    using WorldFeed.Common.Public.Models.RateLimits;

    public interface ITweetinviJsonConverter
    {
        string ToJson<TFrom>(TFrom obj) where TFrom : class;
        string ToJson<TFrom, TTo>(TFrom obj) where TFrom : class where TTo : class;

        TTo ConvertJsonTo<TTo>(string json) where TTo : class;
    }

    public class TweetinviJsonConverter : ITweetinviJsonConverter
    {
        private readonly IJsonObjectConverter jsonObjectConverter;
        private readonly Dictionary<Type, IJsonConverter> defaultSerializers;
        private readonly Dictionary<Type, Dictionary<Type, IJsonConverter>> serializers;

        public TweetinviJsonConverter(ITwitterClient client, IJsonObjectConverter jsonObjectConverter)
        {
            this.jsonObjectConverter = jsonObjectConverter;
            var factories = client.Factories;

            this.defaultSerializers = new Dictionary<Type, IJsonConverter>();
            this.serializers = new Dictionary<Type, Dictionary<Type, IJsonConverter>>();

            // ReSharper disable RedundantTypeArgumentsOfMethod
            Map<ITweet, ITweetDTO>(tweet => tweet.TweetDTO, factories.CreateTweet);
            Map<IUser, IUserDTO>(user => user.UserDTO, factories.CreateUser);
            Map<IAuthenticatedUser, IUserDTO>(user => user.UserDTO, factories.CreateAuthenticatedUser);
            Map<IAccountSettings, IAccountSettingsDTO>(accountSettings => accountSettings.AccountSettingsDTO, factories.CreateAccountSettings);
            Map<IMessage, IMessageEventDTO>(message => message.MessageEventDTO, factories.CreateMessage);
            Map<IMessage, IMessageEventWithAppDTO>(message =>
            {
                return new MessageEventWithAppDTO
                {
                    MessageEvent = message.MessageEventDTO,
                    App = message.App
                };
            }, factories.CreateMessageFromMessageEventWithApp);
            Map<ITwitterList, ITwitterListDTO>(list => list.TwitterListDTO, factories.CreateTwitterList);

            Map<ITwitterCredentials, ITwitterCredentials>(credentials => credentials, factories.CreateTwitterCredentials);
            Map<ITwitterCredentials, IConsumerOnlyCredentials>(credentials => new ConsumerOnlyCredentials(credentials), factories.CreateTwitterCredentials);
            Map<IConsumerOnlyCredentials, IConsumerOnlyCredentials>(credentials => credentials, factories.CreateConsumerCredentials);
            Map<IConsumerOnlyCredentials, ITwitterCredentials>(credentials => new TwitterCredentials(credentials), factories.CreateConsumerCredentials);

            Map<IMedia, IMedia>(media => media, factories.CreateMedia);
            Map<IUploadedMediaInfo, IUploadedMediaInfo>(mediaInfo => mediaInfo, factories.CreateUploadedMediaInfo);

            Map<ISearchResults, SearchResultsDTO>(result =>
            {
                return new SearchResultsDTO
                {
                    TweetDTOs = result.Tweets.Select(tweetWithSearchMetadata =>
                    {
                        var tweetDTOJson = this.jsonObjectConverter.Serialize(tweetWithSearchMetadata.TweetDTO);
                        var tweetWithSearchMetadataDTO = this.jsonObjectConverter.Deserialize<TweetWithSearchMetadataDTO>(tweetDTOJson);
                        tweetWithSearchMetadataDTO.TweetFromSearchMetadata = tweetWithSearchMetadata.SearchMetadata;
                        return tweetWithSearchMetadataDTO;
                    }).ToArray(),
                    SearchMetadata = result.SearchMetadata
                };
            }, factories.CreateSearchResult);
            Map<ICredentialsRateLimits, CredentialsRateLimitsDTO>(rateLimits => rateLimits.CredentialsRateLimitsDTO, factories.CreateRateLimits);
            Map<ITwitterConfiguration, ITwitterConfiguration>(config => config, factories.CreateTwitterConfiguration);
            Map<ISavedSearch, ISavedSearchDTO>(savedSearch => savedSearch.SavedSearchDTO, factories.CreateSavedSearch);
            Map<IOEmbedTweet, IOEmbedTweetDTO>(oEmbedTweet => oEmbedTweet.OembedTweetDTO, factories.CreateOEmbedTweet);
            Map<IRelationshipDetails, IRelationshipDetailsDTO>(relationshipDetails => relationshipDetails.RelationshipDetailsDTO, factories.CreateRelationshipDetails);
            Map<IRelationshipState, IRelationshipStateDTO>(r => r.RelationshipStateDTO, factories.CreateRelationshipState);
            Map<IWebhook, IWebhookDTO>(env => env.WebhookDTO, factories.CreateWebhook);
            Map<IWebhookEnvironment, IWebhookEnvironmentDTO>(env => env.WebhookEnvironmentDTO, factories.CreateWebhookEnvironment);
            Map<IWebhookEnvironmentSubscriptions, IWebhookEnvironmentSubscriptionsDTO>(env => env.WebhookEnvironmentSubscriptionsDTO, factories.CreateWebhookEnvironmentSubscriptions);
            // ReSharper restore RedundantTypeArgumentsOfMethod
        }

        // TO JSON
        public string ToJson<T>(T obj) where T : class
        {
            return ToJson(obj, null);
        }

        public string ToJson<T1, T2>(T1 obj) where T1 : class where T2 : class
        {
            if (this.serializers.TryGetValue(typeof(T1), out var serializersByType))
            {
                if (serializersByType.TryGetValue(typeof(T2), out var serializer))
                {
                    return ToJson(obj, serializer);
                }
            }

            return ToJson(obj, null);
        }

        private string ToJson<T>(T obj, IJsonConverter converter)
        {
            var type = typeof(T);
            object toSerialize = obj;

            if (obj is IEnumerable enumerable)
            {
                var genericType = type.GetElementType() ?? type.GetGenericArguments()[0];

                converter ??= GetSerializerFromNonCollectionType(genericType);

                if (converter != null)
                {
                    var list = new List<object>();

                    foreach (var o in enumerable)
                    {
                        list.Add(converter.GetObjectToSerialize(o));
                    }

                    toSerialize = list;
                }
            }
            else
            {
                converter ??= GetSerializerFromNonCollectionType(type);
                if (converter != null)
                {
                    toSerialize = converter.GetObjectToSerialize(obj);
                }
            }

            try
            {
                return this.jsonObjectConverter.Serialize(toSerialize);
            }
            catch (Exception ex)
            {
                throw new Exception(
                    "The type provided is probably not compatible with Tweetinvi Json serializer." +
                    "If you think class should be serializable by default please report on github.com/linvi/tweetinvi.",
                    ex
                );
            }
        }

        public T ConvertJsonTo<T>(string json) where T : class
        {
            return ConvertJsonTo<T>(json, null);
        }

        public TTo ConvertJsonTo<TFrom, TTo>(string json) where TFrom : class where TTo : class
        {
            if (this.serializers.TryGetValue(typeof(TFrom), out var serializersByType))
            {
                if (serializersByType.TryGetValue(typeof(TTo), out var serializer))
                {
                    return ConvertJsonTo<TTo>(json, serializer);
                }
            }

            return ConvertJsonTo<TTo>(json, null);
        }

        private T ConvertJsonTo<T>(string json, IJsonConverter converter) where T : class
        {
            var type = typeof(T);

            try
            {
                if (typeof(IEnumerable).IsAssignableFrom(type))
                {
                    Type genericType = null;

                    if (type.GetTypeInfo().IsGenericType)
                    {
                        genericType = type.GetGenericArguments()[0];
                    }
                    else if (typeof(Array).IsAssignableFrom(type))
                    {
                        genericType = type.GetElementType();
                    }

                    converter ??= GetSerializerFromNonCollectionType(genericType);
                    if (genericType != null && converter != null)
                    {
                        var list = (IList)Activator.CreateInstance(typeof(List<>).MakeGenericType(genericType));

                        JArray jsonArray = JArray.Parse(json);

                        foreach (var elt in jsonArray)
                        {
                            var eltJson = elt.ToString();
                            list.Add(converter.Deserialize(eltJson));
                        }

                        if (typeof(Array).IsAssignableFrom(type))
                        {
                            var array = Array.CreateInstance(genericType, list.Count);
                            list.CopyTo(array, 0);
                            return array as T;
                        }

                        return list as T;
                    }
                }

                converter ??= GetSerializerFromNonCollectionType(type);

                if (converter != null)
                {
                    return converter.Deserialize(json) as T;
                }

                return this.jsonObjectConverter.Deserialize<T>(json);
            }
            catch (Exception ex)
            {
                throw new Exception(
                    "The type provided is probably not compatible with Tweetinvi Json serializer." +
                    "If you think class should be deserializable by default please report on github.com/linvi/tweetinvi.",
                    ex
                );
            }
        }

        private IJsonConverter GetSerializerFromNonCollectionType(Type type)
        {
            // Test interfaces
            if (this.defaultSerializers.ContainsKey(type))
            {
                return this.defaultSerializers[type];
            }

            // Test concrete classes from mapped interfaces
            if (this.defaultSerializers.Keys.Any(x => x.IsAssignableFrom(type)))
            {
                return this.defaultSerializers.FirstOrDefault(x => x.Key.IsAssignableFrom(type)).Value;
            }

            return null;
        }

        private void Map<T1, T2>(Func<T1, T2> getDto, Func<string, T1> deserialize) where T1 : class where T2 : class
        {
            var jsonTypeConverter = new JsonTypeConverter<T1, T2>(getDto, deserialize);

            if (!this.defaultSerializers.ContainsKey(typeof(T1)))
            {
                this.defaultSerializers.Add(typeof(T1), jsonTypeConverter);
            }

            if (!this.serializers.ContainsKey(typeof(T1)))
            {
                this.serializers.Add(typeof(T1), new Dictionary<Type, IJsonConverter>());
            }

            this.serializers[typeof(T1)].Add(typeof(T2), jsonTypeConverter);
        }
    }
}
