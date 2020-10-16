import {ResourcesHelper} from "../../core/Core/Helpers/ResourcesHelper";

export static class LogicResources {
  //   Looks up a localized string similar to Not Modified - There was no new data to return..
  public static ExceptionDescription_44: string = "The attachment_url parameter is invalid.";

  //   Looks up a localized string similar to Not Modified - There was no new data to return..
  public static ExceptionDescription_304: string = "Not Modified - There was no new data to return.";

  //   The Tweet exceeds the number of allowed attachment types.
  public static ExceptionDescription_385: string = "You attempted to reply to a tweet that is deleted or not visible to you.";

  //   The Tweet exceeds the number of allowed attachment types.
  public static ExceptionDescription_386: string = "The Tweet exceeds the number of allowed attachment types.";

  //   Looks up a localized string similar to Bad Request - The request was invalid or cannot be otherwise served. An accompanying error message will explain further. In API v1.1, requests without authentication are considered invalid and will yield this response..
  public static ExceptionDescription_400: string = "Bad Request - The request was invalid or cannot be otherwise served. An accompanying error message will explain further. In API v1.1, requests without authentication are considered invalid and will yield this response.";

  //   Looks up a localized string similar to Unauthorized -  Authentication credentials were missing or incorrect..
  public static ExceptionDescription_401: string = "Unauthorized -  Authentication credentials were missing or incorrect.";

  //   Looks up a localized string similar to Forbidden - The request is understood, but it has been refused or access is not allowed. An accompanying error message will explain why. This code is used when requests are being denied due to update limits..
  public static ExceptionDescription_403: string = "Forbidden - The request is understood, but it has been refused or access is not allowed. An accompanying error message will explain why. This code is used when requests are being denied due to update limits.";

  //   Looks up a localized string similar to Not Found - The URI requested is invalid or the resource requested, such as a user, does not exists. Also returned when the requested format is not supported by the requested method..
  public static ExceptionDescription_404: string = "Not Found - The URI requested is invalid or the resource requested, such as a user, does not exists. Also returned when the requested format is not supported by the requested method.";

  //   Looks up a localized string similar to Not Acceptable - Returned by the Search API when an invalid format is specified in the request..
  public static ExceptionDescription_406: string = "Not Acceptable - Returned by the Search API when an invalid format is specified in the request.";

  //   Looks up a localized string similar to Gone - This resource is gone. Used to indicate that an API endpoint has been turned off. For example: &quot;The Twitter REST API v1 will soon stop functioning. Please migrate to API v1.1..
  public static ExceptionDescription_410: string = "Gone - This resource is gone. Used to indicate that an API endpoint has been turned off. For example: \"The Twitter REST API v1 will soon stop functioning. Please migrate to API v1.1.\"";

  //   Looks up a localized string similar to Enhance Your Calm
  public static ExceptionDescription_420: string = "Enhance Your Calm";

  //   Looks up a localized string similar to Unprocessable Entity - Returned when an image uploaded to POST account/update_profile_banner is unable to be processed..
  public static ExceptionDescription_422: string = "Unprocessable Entity - Returned when an image uploaded to POST account/update_profile_banner is unable to be processed.";

  //   Looks up a localized string similar to Too Many Requests - Returned in API v1.1 when a request cannot be served due to the application&apos;s rate limit having been exhausted for the resource. See Rate Limiting in API v1.1..
  public static ExceptionDescription_429: string = "Too Many Requests - Returned in API v1.1 when a request cannot be served due to the application's rate limit having been exhausted for the resource. See Rate Limiting in API v1.1.";

  //   Looks up a localized string similar to Internal Server Error - Something is broken. Please post to the group so the Twitter team can investigate..
  public static ExceptionDescription_500: string = "Internal Server Error - Something is broken. Please post to the group so the Twitter team can investigate.";

  //   Looks up a localized string similar to Bad Gateway - Twitter is down or being upgraded..
  public static ExceptionDescription_502: string = "Bad Gateway - Twitter is down or being upgraded.";

  //   Looks up a localized string similar to Service Unavailable - The Twitter servers are up, but overloaded with requests. Try again later..
  public static ExceptionDescription_503: string = "Service Unavailable - The Twitter servers are up, but overloaded with requests. Try again later.";

  //   Looks up a localized string similar to Gateway timeout - The Twitter servers are up, but the request couldn&apos;t be serviced due to some failure within our stack. Try again later..
  public static ExceptionDescription_504: string = "Gateway timeout - The Twitter servers are up, but the request couldn't be serviced due to some failure within our stack. Try again later.";

  public static GetResourceByName(resourceName: string): string {
    return ResourcesHelper.getResourceByType(typeof (LogicResources), resourceName);
  }
