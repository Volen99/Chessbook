import {Inject, Injectable} from "@angular/core";

import {IRateLimitHelper} from "../../core/Core/RateLimit/IRateLimitHelper";
import {IWebHelper, IWebHelperToken} from "../../core/Core/Helpers/IWebHelper";
import {ICredentialsRateLimits} from 'src/app/core/Public/Models/RateLimits/ICredentialsRateLimits';
import {IEndpointRateLimit} from 'src/app/core/Public/Models/RateLimits/IEndpointRateLimit';
import {TwitterEndpointAttribute} from "../../core/Core/Attributes/TwitterEndpointAttribute";
import {EndpointRateLimit} from "../../core/Core/Models/EndpointRateLimit";
import {IAttributeHelper, IAttributeHelperToken} from "../../core/Core/Helpers/AttributeHelper";
import Regex from "typescript-dotnet-commonjs/System/Text/RegularExpressions";

@Injectable({
  providedIn: 'root',
})
export class RateLimitHelper implements IRateLimitHelper {
  private readonly _webHelper: IWebHelper;
  private readonly _attributeHelper: IAttributeHelper;

  constructor(@Inject(IWebHelperToken) webHelper: IWebHelper,
              @Inject(IAttributeHelperToken) attributeHelper: IAttributeHelper) {
    this._webHelper = webHelper;
    this._attributeHelper = attributeHelper;
  }

  public getEndpointRateLimitFromQuery(query: string, rateLimits: ICredentialsRateLimits, createIfNotExist: boolean): IEndpointRateLimit {
    let queryBaseURL = this._webHelper.getBaseURL(query);
    if (/*rateLimits == null || */queryBaseURL == null) { // TODO: UNCOMMENT!!
      return null;
    }

    // let tokenAttributes = this._attributeHelper.getAllPropertiesAttributes<ICredentialsRateLimits, TwitterEndpointAttribute>();
    // let matchingAttribute = tokenAttributes.keys.justOneOrDefault(x => this.isEndpointURLMatchingQueryURL(queryBaseURL, x));
    //
    // // In the default list of rate limits
    // if (matchingAttribute != null) {
    //   let matchingProperty = tokenAttributes[matchingAttribute];
    //   return this.getRateLimitFromProperty(matchingProperty, rateLimits);
    // }
    //
    // // In the other endpoint rate limits
    // let matchingKeyPair = rateLimits.otherEndpointRateLimits.filter(x => this.isEndpointURLMatchingQueryURL(queryBaseURL, x.key))[0];
    // // if (!matchingKeyPair.Equals(default(KeyValuePair<TwitterEndpointAttribute, IEndpointRateLimit>))) {
    // return matchingKeyPair.value;
    // // }
    //
    // if (!createIfNotExist) {
    //   return null;
    // }

    // Other endpoint rate limits do not yet exist; therefore we create a new one and return it.
    let attribute = new TwitterEndpointAttribute(queryBaseURL);
    let endpointRateLimit = new EndpointRateLimit();
    endpointRateLimit.isCustomHeaderRateLimit = true;

    // rateLimits.otherEndpointRateLimits.setValue(attribute, endpointRateLimit);
    return endpointRateLimit;
  }

  private getRateLimitFromProperty(propertyInfo: any, rateLimits: ICredentialsRateLimits): IEndpointRateLimit {
    let rateLimit = propertyInfo.GetValue(rateLimits, null) as IEndpointRateLimit;
    return rateLimit;
  }

  private isEndpointURLMatchingQueryURL(queryURL: string, twitterEndpoint: TwitterEndpointAttribute): boolean {
    if (twitterEndpoint.isRegex) {
      return Regex.isMatch(queryURL, twitterEndpoint.endpointURL);
    } else {
      return queryURL === twitterEndpoint.endpointURL;
    }
  }
}
