import {ITwitterClientFactories} from "./Client/Tools/ITwitterClientFactories";
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
import {IExternalClientEvents} from "../Core/Events/TweetinviGlobalEvents";

export interface ITwitterClient {
  // Client to execute all actions related with the account associated with the clients' credentials
  accountSettings: IAccountSettingsClient;

  // Client to execute all actions related with authentication
  auth: IAuthClient;

  // Client to execute all actions from the help path
  help: IHelpClient;

  // Client to execute custom requests
  execute: IExecuteClient;

  // Client to execute all actions related with twitter lists
  lists: IListsClient;

  // Client to execute all actions related with messages
  messages: IMessagesClient;

  // Client to execute all actions related with rate limits
  rateLimits: IRateLimitsClient;

  // Client to execute all actions related with search
  search: ISearchClient;

  // Client to create all type of streams
  streams: IStreamsClient;

  // Client to execute all actions related with timelines
  timelines: ITimelinesClient;

  // Client to execute all actions related with trends
  trends: ITrendsClient;

  // Client to execute all actions related with tweets
  tweets: ITweetsClient;

  // Client to execute all actions related with users
  users: IUsersClient;

  // Client to execute all actions related with media upload
  upload: IUploadClient;

  // Client to execute all the actions related with webhooks
  accountActivity: IAccountActivityClient;

  // Execute Request and receive request results
  raw: IRawExecutors;

  // Client's config
  config: ITweetinviSettings;

  // Client's credentials
  credentials: IReadOnlyTwitterCredentials;

  // Listen to events raised by actions performed by the client
  events: IExternalClientEvents;

  // Simple way to construct tweetinvi objects
  factories: ITwitterClientFactories;

  // Help you perform json operations with Tweetinvi objects
  json: IJsonClient;

  // Validate parameters to ensure that they meet the default criteria
  parametersValidator: IParametersdValidator;

  // Creates skeleton request representing a request from the client
  createRequest(): ITwitterRequest;

  // Create an execution context for a request to be sent to Twitter.
  createTwitterExecutionContext(): ITwitterExecutionContext;
}
