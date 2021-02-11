import {SortMeta} from 'primeng/api';
import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ComponentPaginationLight} from './component-pagination.model';
import {RestPagination} from './rest-pagination';
import {ICursorQueryParameters} from "../../shared/models/query/cursor-query-parameters";
import {SharebookConsts} from "../../helpers/sharebook-consts";
import {ITimelineRequestParameters} from "../../shared/models/timeline/timeline-request-parameters";
import {IMinMaxQueryParameters} from "../../shared/models/query/min-max-query-parameters";
import {OEmbedTweetAlignment, OEmbedTweetTheme} from "../../shared/posts/parameters/get-OEmbed-tweet-parameters";

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

  addRestGetParams(params: HttpParams, pagination?: RestPagination, sort?: any | string) {
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
    const start: number = (componentPagination.currentPage - 1) * componentPagination.itemsPerPage;
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
      return SharebookConsts.EMPTY;
    }

    return `&count=${count}`;
  }

  public generateTrimUserParameter(trimUser?: boolean): string {
    if (trimUser == null) {
      return SharebookConsts.EMPTY;
    }

    return `&trim_user=${trimUser}`;
  }

  public generateSinceIdParameter(sinceId?: number): string {
    if (sinceId == null || sinceId <= 0) {
      return SharebookConsts.EMPTY;
    }

    return `&since_id=${sinceId}`;
  }

  public generateMaxIdParameter(maxId?: number): string {
    if (maxId == null || maxId <= 0) {
      return SharebookConsts.EMPTY;
    }

    return `&max_id=${maxId}`;
  }

  public generateIncludeEntitiesParameter(includeEntities?: boolean): string {
    if (includeEntities == null) {
      return SharebookConsts.EMPTY;
    }

    return `&include_entities=${includeEntities}`;
  }

  public generateSkipStatusParameter(skipStatus: boolean): string {
    return `&skip_status=${skipStatus}`;
  }

  public generatePageNumberParameter(pageNumber?: number): string {
    if (pageNumber == null) {
      return SharebookConsts.EMPTY;
    }

    return `&page_number=${pageNumber}`;
  }

  public generateIncludeRetweetsParameter(includeRetweets: boolean): string {
    return `&include_rts=${includeRetweets}`;
  }

  // public generateLanguageParameter(language: Language): string {
  //   let languageParameter = SharebookConsts.EMPTY;
  //   if (language != null && language !== Languages.Undefined) {
  //     let languageCode = language.getLanguageCode();
  //     if (languageCode) {
  //       languageParameter = `lang=${languageCode}`;
  //     }
  //   }
  //
  //   return languageParameter;
  // }

  public generateCursorParameter(cursor: string): string {
    return !(cursor) ? "" : `&cursor=${cursor}`;
  }

  // public generateTweetIdentifier(tweetId: ITweetIdentifier): string {
  //   return tweetId.idStr ?? tweetId.id.toString();
  // }

  public generateAdditionalRequestParameters(additionalParameters: string, existingParameters: boolean = true): string {
    if (!additionalParameters) {
      return SharebookConsts.EMPTY;
    }

    return `${(existingParameters ? "&" : "?")}${additionalParameters}`;
  }

  addMinMaxQueryParameters(params: HttpParams, parameters: IMinMaxQueryParameters): HttpParams {
    let paramsNew = params;

    paramsNew = paramsNew.set('count', parameters.pageSize.toString());
    paramsNew = paramsNew.set('since_id', parameters.sinceId.toString());
    /*paramsNew = paramsNew.set('max_id', parameters.maxId.toString());*/

    return paramsNew;
  }

  public addTimelineParameters(params: HttpParams, parameters: ITimelineRequestParameters): HttpParams {
    /*this.addMinMaxQueryParameters(query, parameters);*/
    let paramsNew = params;

    paramsNew = paramsNew.set('count', parameters.includeEntities?.toString());
    paramsNew = paramsNew.set('since_id', parameters.trimUser?.toString());
    // paramsNew = paramsNew.set('max_id', 'Extended');

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

    let query = paramsNew.toString();

    // if (query.includes("?") && query[query.length - 1] !== '?' && query[query.length - 1] !== '&' && parameter[0] !== '&') {
    //   query += "&";
    // }
    //
    // if (!query.includes("?")) {
    //   query += ("?");
    // }

    query += parameter;

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

  public generateOEmbedAlignmentParameter(alignment?: OEmbedTweetAlignment): string {
    if (alignment == null) {
      return null;
    }

    switch (alignment) {
      case OEmbedTweetAlignment.None:
        return "none";
      case OEmbedTweetAlignment.Left:
        return "left";
      case OEmbedTweetAlignment.Center:
        return "center";
      case OEmbedTweetAlignment.Right:
        return "right";
      default:
        return null;
    }
  }

  public generateOEmbedThemeParameter(theme?: OEmbedTweetTheme): string {
    if (theme == null) {
      return null;
    }

    switch (theme) {
      case OEmbedTweetTheme.Light:
        return "light";
      case OEmbedTweetTheme.Dark:
        return "dark";
      default:
        return null;
    }
  }


}
