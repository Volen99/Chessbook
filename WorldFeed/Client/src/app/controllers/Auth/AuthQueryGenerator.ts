import {Resources} from "../../properties/resources";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {AuthAccessType} from "../../core/Public/Parameters/Auth/AuthAccessType";

public interface IAuthQueryGenerator {
  GetCreateBearerTokenQuery(parameters: ICreateBearerTokenParameters): string;

  GetRequestAuthUrlQuery(parameters: IRequestAuthUrlParameters): string;

  GetRequestCredentialsQuery(parameters: IRequestCredentialsParameters): string;

  GetInvalidateBearerTokenQuery(parameters: IInvalidateBearerTokenParameters): string;

  GetInvalidateAccessTokenQuery(parameters: IInvalidateAccessTokenParameters): string;
}

public class AuthQueryGenerator implements IAuthQueryGenerator {
  public GetCreateBearerTokenQuery(parameters: ICreateBearerTokenParameters): string {
    var query = new StringBuilder(Resources.Auth_CreateBearerToken);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
    return query.toString();
  }

  public GetRequestAuthUrlQuery(parameters: IRequestAuthUrlParameters): string {
    var query = new StringBuilder(Resources.Auth_RequestToken);

    if (parameters.authAccessType != null) {
      var paramValue = parameters.authAccessType === AuthAccessType.ReadWrite ? "write" : "read";
      query.addParameterToQuery("x_auth_access_type", paramValue);
    }

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
    return query.ToString();
  }

  public GetRequestCredentialsQuery(parameters: IRequestCredentialsParameters): string {
    var query = new StringBuilder(Resources.Auth_RequestAccessToken);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
    return query.ToString();
  }

  public GetInvalidateBearerTokenQuery(parameters: IInvalidateBearerTokenParameters): string {
    var query = new StringBuilder(Resources.Auth_InvalidateBearerToken);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
    return query.ToString();
  }

  public GetInvalidateAccessTokenQuery(parameters: IInvalidateAccessTokenParameters): string {
    var query = new StringBuilder(Resources.Auth_InvalidateAccessToken);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
    return query.ToString();
  }
}
