export interface ITwitterEndpointAttribute {
  // Endpoint url matcher.
  endpointURL: string;

  // Specify the the EndpointURL parameter is a regex.
  isRegex: boolean;
}

// Attribute indicating how to match an endpoint rate limits with a specific url
// as well as the number of available requests for this endpoint.
// [AttributeUsage(AttributeTargets.All, AllowMultiple = true)]
export class TwitterEndpointAttribute implements ITwitterEndpointAttribute {
  constructor(endpointURL: string, isRegex: boolean = false) {
    this.endpointURL = endpointURL;
    this.isRegex = isRegex;
  }

  public endpointURL: string;
  public isRegex: boolean;
}

// export declare function TwitterEndpointAttribute(endpointURL: string, isRegex: boolean = false): any {
//
// }
