import {ITweetIdentifier} from "../../core/Public/Models/Interfaces/ITweetIdentifier";
import {ICursorQueryParameters} from "../../core/Public/Parameters/CursorQueryParameters";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {IMinMaxQueryParameters} from "../../core/Public/Parameters/MaxAndMinBaseQueryParameters";
import {ITimelineRequestParameters} from "../../core/Public/Parameters/TimelineRequestParameters";
import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {OEmbedTweetAlignment, OEmbedTweetTheme} from "../../core/Public/Parameters/TweetsClient/GetOEmbedTweetParameters";
import {Language} from "../../core/Public/Models/Enum/Language";
import {SharebookConsts} from "../../core/Public/sharebook-consts";

export interface IQueryParameterGenerator {
  appendCursorParameters(query: StringBuilder, parameters: ICursorQueryParameters): void;

  generateLanguageParameter(language?: Language): string;

  generateTweetIdentifier(tweetId: ITweetIdentifier): string;

  generateAdditionalRequestParameters(additionalParameters: string, existingParameters: boolean /*= true*/): string;

  generateOEmbedAlignmentParameter(alignment?: OEmbedTweetAlignment): string;

  generateOEmbedThemeParameter(theme?: OEmbedTweetTheme): string;

  addMinMaxQueryParameters(query: StringBuilder, parameters: IMinMaxQueryParameters): void;

  addTimelineParameters(query: StringBuilder, parameters: ITimelineRequestParameters, tweetMode: ComputedTweetMode): void;
}

export class QueryParameterGenerator implements IQueryParameterGenerator {
  public appendCursorParameters(query: StringBuilder, parameters: ICursorQueryParameters): void {
    query.addParameterToQuery("cursor", parameters.cursor);
    query.addParameterToQuery("count", parameters.pageSize);
  }

  public GenerateCountParameter(count: number): string {
    if (count === -1) {
      return SharebookConsts.EMPTY;
    }

    return `&count=${count}`;
  }

  public GenerateTrimUserParameter(trimUser?: boolean): string {
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

  public generateLanguageParameter(language?: Language): string {
    let languageParameter = SharebookConsts.EMPTY;
    if (language != null && language !== Language.Undefined) {
      let languageCode = language.GetLanguageCode();
      if (languageCode) {
        languageParameter = `lang=${languageCode}`;
      }
    }

    return languageParameter;
  }

  public generateCursorParameter(cursor: string): string {
    return !(cursor) ? "" : `&cursor=${cursor}`;
  }

  public generateTweetIdentifier(tweetId: ITweetIdentifier): string {
    return tweetId.idStr ?? tweetId.id.toString();
  }

  public generateAdditionalRequestParameters(additionalParameters: string, existingParameters: boolean = true): string {
    if (!additionalParameters) {
      return SharebookConsts.EMPTY;
    }

    return `${(existingParameters ? "&" : "?")}${additionalParameters}`;
  }

  public addMinMaxQueryParameters(query: StringBuilder, parameters: IMinMaxQueryParameters): void {
    query.addParameterToQuery("count", parameters.pageSize);
    query.addParameterToQuery("since_id", parameters.sinceId);
    query.addParameterToQuery("max_id", parameters.maxId);
  }

  public addTimelineParameters(query: StringBuilder, parameters: ITimelineRequestParameters, tweetMode: ComputedTweetMode): void {
    query.addMinMaxQueryParameters(query, parameters);
    query.addParameterToQuery("include_entities", parameters.includeEntities);
    query.addParameterToQuery("trim_user", parameters.trimUser);
    query.addParameterToQuery("tweet_mode", tweetMode);
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
