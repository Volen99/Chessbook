import {IReadOnlyConsumerCredentials, ReadOnlyConsumerCredentials} from "./ReadOnlyConsumerCredentials";
import Type from "typescript-dotnet-commonjs/System/Types";

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
    super(consumerKeyOrCredentials);

    let credentialsCurrent: IReadOnlyConsumerCredentials;
    if (Type.isString(consumerKeyOrCredentials)) {
      credentialsCurrent = new ReadOnlyConsumerCredentials(consumerKeyOrCredentials, bearerTokenOrAccessToken);

      if (accessTokenSecret) {
        this.accessToken = bearerTokenOrAccessToken;
        this.accessTokenSecret = accessTokenSecret;
      }
    } else {

      if (bearerTokenOrAccessToken) {
        this.accessToken = bearerTokenOrAccessToken;
        this.accessTokenSecret = accessTokenSecret;
      } else {
        if (consumerKeyOrCredentials instanceof ReadOnlyConsumerCredentials) {

        } else {
          // this.accessToken = consumerKeyOrCredentials?.accessToken;
          // this.accessTokenSecret = consumerKeyOrCredentials?.accessTokenSecret;
        }
      }
    }
  }

  public accessToken: string;

  public accessTokenSecret: string;

  // public ReadOnlyTwitterCredentials(consumerKey: string, consumerSecret: string) : base(new ReadOnlyConsumerCredentials(consumerKey, consumerSecret))
  // {
  //   super();
  // }

  // public ReadOnlyTwitterCredentials(string consumerKey, string consumerSecret, string bearerToken) : base(new ReadOnlyConsumerCredentials(consumerKey, consumerSecret, bearerToken))
  // {
  // }
  //
  // public ReadOnlyTwitterCredentials(string consumerKey, string consumerSecret, string accessToken, string accessTokenSecret) : base(new ReadOnlyConsumerCredentials(consumerKey, consumerSecret))
  // {
  //     AccessToken = accessToken;
  //     AccessTokenSecret = accessTokenSecret;
  // }
  //
  // public ReadOnlyTwitterCredentials(IReadOnlyConsumerCredentials consumerCredentials, string accessToken, string accessTokenSecret) : base(consumerCredentials)
  // {
  //     AccessToken = accessToken;
  //     AccessTokenSecret = accessTokenSecret;
  // }
  //
  // public ReadOnlyTwitterCredentials(IReadOnlyConsumerCredentials source) : base(source)
  // {
  // }
  //
  // public ReadOnlyTwitterCredentials(IReadOnlyTwitterCredentials source) : base(source)
  // {
  //     AccessToken = source?.AccessToken;
  //     AccessTokenSecret = source?.AccessTokenSecret;
  // }

}
