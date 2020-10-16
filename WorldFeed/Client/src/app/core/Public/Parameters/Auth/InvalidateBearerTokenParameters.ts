import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";


// For more information visit: https://developer.twitter.com/en/docs/basics/authentication/api-reference/invalidate_bearer_token
export interface IInvalidateBearerTokenParameters extends ICustomRequestParameters {
}

export class InvalidateBearerTokenParameters extends CustomRequestParameters implements IInvalidateBearerTokenParameters {
}
