import Type from "typescript-dotnet-commonjs/System/Types";
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";

export abstract class StringBuilderExtensions {
  public static addParameterToQuery<T>(queryBuilder: StringBuilder, parameterName: string, parameterValue: string | T): void {
    if (!parameterName || !parameterValue) {
      return;
    }

    if (Type.isString(parameterValue)) {
      let query = queryBuilder.toString();

      if (query.includes("?") && query[query.length - 1] !== '?' && query[query.length - 1] !== '&') {
        queryBuilder.append("&");
      }

      if (!query.includes("?")) {
        queryBuilder.append("?");
      }

      queryBuilder.append(`${parameterName}=${/*Uri.EscapeDataString*/(parameterValue)}`);
    } else {
      // let type = typeof (T);
      if (/*Nullable.GetUnderlyingType(type) != null*/ true) {
        let stringValue = parameterValue.toString();
        let typeofValue = parameterValue/*.GetType()*/.toString();

        if (stringValue === typeofValue) {
          return;
        }

        let doubleValue = parameterValue as unknown as number | null;
        if (doubleValue != null) {
          stringValue = doubleValue.toString(/*CultureInfo.InvariantCulture*/);
        }

        if (stringValue != null) {
          StringBuilderExtensions.addParameterToQuery(queryBuilder, parameterName, stringValue.toLocaleLowerCase());
        }
      } else {
        let stringValue = parameterValue.toString();

        if (Type.isNumber(parameterValue)) {
          // @ts-ignore
          stringValue = (<number> <object> parameterValue).toString(/*CultureInfo.InvariantCulture*/);
        }

        if (stringValue != null) {
          StringBuilderExtensions.addParameterToQuery(queryBuilder, parameterName, stringValue.toLocaleLowerCase());
        }
      }
    }
  }

  public static addFormattedParameterToQuery(queryBuilder: StringBuilder, parameter: string): void {
    if (!parameter) {
      return;
    }

    if (parameter.startsWith("?")) {
      parameter = parameter.substr(1);
    }

    let query = queryBuilder.toString();

    if (query.includes("?") && query[query.length - 1] !== '?' && query[query.length - 1] !== '&' && parameter[0] !== '&') {
      queryBuilder.append("&");
    }

    if (!query.includes("?")) {
      queryBuilder.append("?");
    }

    queryBuilder.append(parameter);
  }

  public static addFormattedParameterToParametersList(queryBuilder: StringBuilder, parameter: string): void {
    if (!parameter) {
      return;
    }

    let query = queryBuilder.toString();

    if ((query.length === 0 || query[query.length - 1] !== '&') && parameter[0] !== '&') {
      queryBuilder.append("&");
    }

    queryBuilder.append(parameter);
  }
}
