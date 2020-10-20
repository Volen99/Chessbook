import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit: https://developer.twitter.com/en/docs/basics/authentication/api-reference/token
export interface ICreateBearerTokenParameters extends ICustomRequestParameters {
}

export class CreateBearerTokenParameters extends CustomRequestParameters implements ICreateBearerTokenParameters {
}
