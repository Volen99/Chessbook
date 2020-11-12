import {IAuthenticationRequest} from "../../core/Public/Models/Authentication/IAuthenticationRequest";
import {IReadOnlyConsumerCredentialsWithoutBearer} from "../../core/Core/Models/Authentication/ReadOnlyConsumerCredentials";
import {SharebookConsts} from "../../core/Public/sharebook-consts";

export class AuthenticationRequest implements IAuthenticationRequest {
  constructor(consumerCredentials?: IReadOnlyConsumerCredentialsWithoutBearer) {
    if (consumerCredentials) {
      this.consumerKey = consumerCredentials?.consumerKey;
      this.consumerSecret = consumerCredentials?.consumerSecret;
    }
  }

  public id: string;

  public consumerKey: string;
  public consumerSecret: string;
  public authorizationKey: string;
  public authorizationSecret: string;

  public verifierCode: string;
  public authorizationURL: string;

  public toString(): string {
    return this.authorizationURL ?? SharebookConsts.EMPTY;
  }
}
