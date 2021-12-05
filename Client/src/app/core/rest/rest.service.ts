import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {SortMeta} from 'primeng/api';

import {ComponentPaginationLight} from './component-pagination.model';
import {RestPagination} from './rest-pagination';
import {ChessbookConsts} from "../../helpers/chessbook-consts";
import {ITweetIdentifier} from "../../shared/posts/models/tweet-identifier";

export interface ICursorQueryParameters {
// The cursor value to start the operation with
  cursor: string;

  // The maximum number of objects to return
  pageSize: number;

  // Collection of custom query parameters
  customQueryParameters: Array<[string, string]>;

  // Formatted string containing all the query parameters to append to a query.
  formattedCustomQueryParameters: string;

  // Add a custom query parameter.
  addCustomQueryParameter(name: string, value: string): void;

  // Clear the query parameters of the query.
  clearCustomQueryParameters(): void;
}

interface QueryStringFilterPrefixes {
  [key: string]: {
    prefix: string
    handler?: (v: string) => string | number
    multiple?: boolean
    isBoolean?: boolean
  };
}

type ParseQueryStringFilterResult = {
  [key: string]: string | number | boolean | (string | number | boolean)[]
};

@Injectable()
export class RestService {

  addRestGetParams(params: HttpParams, pagination?: RestPagination, sort?: SortMeta | string) {
    let newParams = params;

    if (pagination !== undefined) {
      newParams = newParams.set('start', pagination.start.toString())
        .set('count', pagination.count.toString());
    }

    if (sort !== undefined) {
      let sortString = '';

      if (typeof sort === 'string') {
        sortString = sort;
      } else {
        const sortPrefix = sort.order === 1 ? '' : '-';
        sortString = sortPrefix + sort.field;
      }

      newParams = newParams.set('sort', sortString);
    }

    return newParams;
  }

  addArrayParams(params: HttpParams, name: string, values: (string | number)[]) {
    for (const v of values) {
      params = params.append(name, v);
    }

    return params;
  }

  addObjectParams(params: HttpParams, object: { [name: string]: any }) {
    for (const name of Object.keys(object)) {
      const value = object[name];
      if (value === undefined || value === null) continue;

      if (Array.isArray(value)) {
        for (const v of value) params = params.append(name, v);
      } else {
        params = params.append(name, value);
      }
    }

    return params;
  }

  componentPaginationToRestPagination(componentPagination: ComponentPaginationLight): RestPagination {
    const start: number = (componentPagination.currentPage - 1); // * componentPagination.itemsPerPage; because your server works with pageindex
    const count: number = componentPagination.itemsPerPage;

    return {start, count};
  }

  parseQueryStringFilter(q: string, prefixes: QueryStringFilterPrefixes): ParseQueryStringFilterResult {
    if (!q) return {};

    // Tokenize the strings using spaces that are not in quotes
    const tokens = q.match(/(?:[^\s"]+|"[^"]*")+/g)
      .filter(token => !!token);

    // Build prefix array
    const prefixeStrings = Object.values(prefixes)
      .map(p => p.prefix);

    // Search is the querystring minus defined filters
    const searchTokens = tokens.filter(t => {
      return prefixeStrings.every(prefixString => t.startsWith(prefixString) === false);
    });

    const additionalFilters: ParseQueryStringFilterResult = {};

    for (const prefixKey of Object.keys(prefixes)) {
      const prefixObj = prefixes[prefixKey];
      const prefix = prefixObj.prefix;

      const matchedTokens = tokens.filter(t => t.startsWith(prefix))
        .map(t => t.slice(prefix.length)) // Keep the value filter
        .map(t => t.replace(/^"|"$/g, ''))
        .map(t => {
          if (prefixObj.handler) return prefixObj.handler(t);

          return t;
        })
        .filter(t => !!t || t === 0)
        .map(t => prefixObj.isBoolean ? t === 'true' : t);

      if (matchedTokens.length === 0) continue;

      additionalFilters[prefixKey] = prefixObj.multiple === true
        ? matchedTokens
        : matchedTokens[0];
    }

    return {
      search: searchTokens.join(' ') || undefined,

      ...additionalFilters
    };
  }


  appendCursorParameters(params: HttpParams, parameters: ICursorQueryParameters): HttpParams {
    let paramsNew = params;

    paramsNew = paramsNew.set('cursor', parameters.cursor);
    paramsNew = paramsNew.set('count', parameters.pageSize.toString());

    return paramsNew;
  }

  public generateCountParameter(count: number): string {
    if (count === -1) {
      return ChessbookConsts.EMPTY;
    }

    return `&count=${count}`;
  }

  public generateTrimUserParameter(trimUser?: boolean): string {
    if (trimUser == null) {
      return ChessbookConsts.EMPTY;
    }

    return `&trim_user=${trimUser}`;
  }

  public generateSinceIdParameter(sinceId?: number): string {
    if (sinceId == null || sinceId <= 0) {
      return ChessbookConsts.EMPTY;
    }

    return `&since_id=${sinceId}`;
  }

  public generateMaxIdParameter(maxId?: number): string {
    if (maxId == null || maxId <= 0) {
      return ChessbookConsts.EMPTY;
    }

    return `&max_id=${maxId}`;
  }

  public generatePageNumberParameter(pageNumber?: number): string {
    if (pageNumber == null) {
      return ChessbookConsts.EMPTY;
    }

    return `&page_number=${pageNumber}`;
  }

  public generateCursorParameter(cursor: string): string {
    return !(cursor) ? "" : `&cursor=${cursor}`;
  }

  public generateTweetIdentifier(tweetId: ITweetIdentifier): string {
    return tweetId.idStr ?? tweetId.id.toString();
  }

  public generateAdditionalRequestParameters(additionalParameters: string, existingParameters: boolean = true): string {
    if (!additionalParameters) {
      return ChessbookConsts.EMPTY;
    }

    return `${(existingParameters ? "&" : "?")}${additionalParameters}`;
  }

  addMinMaxQueryParameters(params: HttpParams, parameters: any): HttpParams {
    let paramsNew = params;

    paramsNew = paramsNew.set('count', parameters.pageSize.toString());
    paramsNew = paramsNew.set('since_id', parameters.sinceId.toString());

    return paramsNew;
  }

  public addTimelineParameters(params: HttpParams, parameters: any): HttpParams {
    let paramsNew = params;

    paramsNew = paramsNew.set('count', parameters.includeEntities?.toString());
    paramsNew = paramsNew.set('since_id', parameters.trimUser?.toString());

    return paramsNew;
  }

  public addParameterToQuery<T>(params: HttpParams, parameterName: string, parameterValue: string | T): HttpParams {
    let paramsNew = params;

    if (!parameterName || !parameterValue) {
      return paramsNew;
    }

    if (typeof parameterValue === 'string') {
      paramsNew = paramsNew.set(parameterName, parameterValue);
    }

    return paramsNew;
  }

  public addFormattedParameterToQuery(params: HttpParams, parameter: string): HttpParams {
    let paramsNew = params;

    if (!parameter) {
      return paramsNew;
    }

    if (parameter.startsWith("?")) {
      parameter = parameter.substr(1);
    }

    let tokens = parameter.split('=');
    let name = tokens[0];
    let value = tokens[1];

    paramsNew = this.addParameterToQuery(params, name, value);

    return paramsNew;
  }

  public static addFormattedParameterToParametersList(params: HttpParams, parameter: string): HttpParams {
    if (!parameter) {
      return;
    }

    let paramsNew = params;

    let query = paramsNew.toString();

    if ((query.length === 0 || query[query.length - 1] !== '&') && parameter[0] !== '&') {
      query += ("&");
    }

    query += (parameter);

    return paramsNew;
  }

}
