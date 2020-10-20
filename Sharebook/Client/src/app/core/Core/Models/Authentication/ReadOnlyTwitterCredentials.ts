import {IReadOnlyConsumerCredentials, ReadOnlyConsumerCredentials} from "./ReadOnlyConsumerCredentials";
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

export interface IReadOnlyTwitterCredentials extends IReadOnlyConsumerCredentials {
  // AccessToken granting access to user's specific account
  accessToken: string;

  // AccessTokenSecret granting access to user's specific account
  accessTokenSecret: string;
}

// Readonly version of twitter credentials
export class ReadOnlyTwitterCredentials extends ReadOnlyConsumerCredentials implements IReadOnlyTwitterCredentials {
  // @ts-ignore
  constructor(consumerKeyOrCredentials: string | IReadOnlyConsumerCredentials | IReadOnlyTwitterCredentials,
              consumerSecret: string, bearerTokenOrAccessToken?: string, accessTokenSecret?: string) {
    let credentialsCurrent: IReadOnlyConsumerCredentials;
    if (Type.isString(consumerKeyOrCredentials)) {
      credentialsCurrent = new ReadOnlyConsumerCredentials(consumerKeyOrCredentials, consumerSecretOrAccessToken);

      if (accessTokenSecret) {
        this.accessToken = bearerTokenOrAccessToken;
        this.accessTokenSecret = accessTokenSecret;
      }
    } else {
      super(consumerKeyOrCredentials);

      if (bearerTokenOrAccessToken) {
        this.accessToken = bearerTokenOrAccessToken;
        this.accessTokenSecret = accessTokenSecret;
      } else {
        super();
        if (consumerKeyOrCredentials instanceof ReadOnlyConsumerCredentials) {

        } else {
          this.accessToken = consumerKeyOrCredentials?.AccessToken;
          this.accessTokenSecret = consumerKeyOrCredentials?.AccessTokenSecret;
        }
      }
    }
  }

  public accessToken: string;

  public accessTokenSecret: string;

        public ReadOnlyTwitterCredentials(string consumerKey, string consumerSecret) : base(new ReadOnlyConsumerCredentials(consumerKey, consumerSecret))
        {
        }

        public ReadOnlyTwitterCredentials(string consumerKey, string consumerSecret, string bearerToken) : base(new ReadOnlyConsumerCredentials(consumerKey, consumerSecret, bearerToken))
        {
        }

        public ReadOnlyTwitterCredentials(string consumerKey, string consumerSecret, string accessToken, string accessTokenSecret) : base(new ReadOnlyConsumerCredentials(consumerKey, consumerSecret))
        {
            AccessToken = accessToken;
            AccessTokenSecret = accessTokenSecret;
        }

        public ReadOnlyTwitterCredentials(IReadOnlyConsumerCredentials consumerCredentials, string accessToken, string accessTokenSecret) : base(consumerCredentials)
        {
            AccessToken = accessToken;
            AccessTokenSecret = accessTokenSecret;
        }

        public ReadOnlyTwitterCredentials(IReadOnlyConsumerCredentials source) : base(source)
        {
        }

        public ReadOnlyTwitterCredentials(IReadOnlyTwitterCredentials source) : base(source)
        {
            AccessToken = source?.AccessToken;
            AccessTokenSecret = source?.AccessTokenSecret;
        }

    }
