import {IReadOnlyConsumerCredentials} from "../Models/Authentication/ReadOnlyConsumerCredentials";
import {IReadOnlyTwitterCredentials} from "../Models/Authentication/ReadOnlyTwitterCredentials";

export abstract class CredentialsHashCodeGenerator {
  public static createHash(credentials: IReadOnlyTwitterCredentials | IReadOnlyConsumerCredentials): string {
    if (CredentialsHashCodeGenerator.isIReadOnlyTwitterCredentials(credentials)) {
      let hash = `${credentials.consumerKey} - ${credentials.consumerSecret} - ${credentials.bearerToken}`;
      return `${hash} - ${credentials.accessToken}  - ${credentials.accessTokenSecret}`;
    }

    return `${credentials.consumerKey} - ${credentials.consumerSecret} - ${credentials.bearerToken}`;
  }

  private static isIReadOnlyTwitterCredentials(credentials: IReadOnlyConsumerCredentials): credentials is IReadOnlyTwitterCredentials {
    return (credentials as IReadOnlyTwitterCredentials).accessToken !== undefined;
  }
}
