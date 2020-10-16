﻿import {ITwitterClientFactories} from "./Client/Tools/ITwitterClientFactories";
import {IReadOnlyTwitterCredentials} from "../Core/Models/Authentication/ReadOnlyTwitterCredentials";
import {ITweetinviSettings} from "./Settings/TweetinviSettings";
import {IRawExecutors} from "./Client/IRawExecutors";
import {ITwitterRequest} from "./Models/Interfaces/ITwitterRequest";
import {ITwitterExecutionContext} from "../Core/Client/TwitterExecutionContext";
import {IAccountActivityClient} from "./Client/Clients/IAccountActivityClient";
import {IUploadClient} from "./Client/Clients/IUploadClient";
import {IUsersClient} from "./Client/Clients/IUsersClient";
import {ITweetsClient} from "./Client/Clients/ITweetsClient";
import {ITrendsClient} from "./Client/Clients/ITrendsClient";
import {ITimelinesClient} from "./Client/Clients/ITimelinesClient";
import {IStreamsClient} from "./Client/Clients/IStreamsClient";
import {ISearchClient} from "./Client/Clients/ISearchClient";
import {IRateLimitsClient} from "./Client/Clients/IRateLimitsClient";
import {IMessagesClient} from "./Client/Clients/IMessagesClient";
import {IListsClient} from "./Client/Clients/IListsClient";
import {IExecuteClient} from "./Client/Clients/IExecuteClient";
import {IHelpClient} from "./Client/Clients/IHelpClient";
import {IAuthClient} from "./Client/Clients/IAuthClient";
import {IAccountSettingsClient} from "./Client/Clients/IAccountSettingsClient";

export interface ITwitterClient {
  // Client to execute all actions related with the account associated with the clients' credentials
  AccountSettings: IAccountSettingsClient;

  // Client to execute all actions related with authentication
  Auth: IAuthClient;

  // Client to execute all actions from the help path
  Help: IHelpClient;

  // Client to execute custom requests
  Execute: IExecuteClient;

  // Client to execute all actions related with twitter lists
  Lists: IListsClient;

  // Client to execute all actions related with messages
  Messages: IMessagesClient;

  // Client to execute all actions related with rate limits
  RateLimits: IRateLimitsClient;

  // Client to execute all actions related with search
  Search: ISearchClient;

  // Client to create all type of streams
  Streams: IStreamsClient;

  // Client to execute all actions related with timelines
  Timelines: ITimelinesClient;

  // Client to execute all actions related with trends
  Trends: ITrendsClient;

  // Client to execute all actions related with tweets
  Tweets: ITweetsClient;

  // Client to execute all actions related with users
  Users: IUsersClient;

  // Client to execute all actions related with media upload
  Upload: IUploadClient;

  // Client to execute all the actions related with webhooks
  AccountActivity: IAccountActivityClient;

  // Execute Request and receive request results
  Raw: IRawExecutors;

  // Client's config
  Config: ITweetinviSettings;

  // Client's credentials
  Credentials: IReadOnlyTwitterCredentials;

  // Listen to events raised by actions performed by the client
  Events: IExternalClientEvents;

  // Simple way to construct tweetinvi objects
  Factories: ITwitterClientFactories;

  // Help you perform json operations with Tweetinvi objects
  Json: IJsonClient;

  // Validate parameters to ensure that they meet the default criteria
  ParametersValidator: IParametersdValidator;

  // Creates skeleton request representing a request from the client
  CreateRequest(): ITwitterRequest;

  // Create an execution context for a request to be sent to Twitter.
  CreateTwitterExecutionContext(): ITwitterExecutionContext;
}
