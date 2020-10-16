import {ITweetIdentifier} from "../../core/Public/Models/Interfaces/ITweetIdentifier";
import {ICursorQueryParameters} from "../../core/Public/Parameters/CursorQueryParameters";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {IMinMaxQueryParameters} from "../../core/Public/Parameters/MaxAndMinBaseQueryParameters";
import {ITimelineRequestParameters} from "../../core/Public/Parameters/TimelineRequestParameters";
import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {Resources} from "../../properties/resources";
import {OEmbedTweetTheme} from "../../core/Public/Parameters/TweetsClient/GetOEmbedTweetParameters";

export interface IQueryParameterGenerator {
  AppendCursorParameters(query: StringBuilder, parameters: ICursorQueryParameters): void;

  GenerateLanguageParameter(language?: Language): string;

  GenerateTweetIdentifier(tweetId: ITweetIdentifier): string;

  GenerateAdditionalRequestParameters(additionalParameters: string, existingParameters: boolean = true): string;

  GenerateOEmbedAlignmentParameter(alignment?: OEmbedTweetAlignment): string;

  GenerateOEmbedThemeParameter(theme?: OEmbedTweetTheme): string;

  AddMinMaxQueryParameters(query: StringBuilder, parameters: IMinMaxQueryParameters): void;

  AddTimelineParameters(query: StringBuilder, parameters: ITimelineRequestParameters, tweetMode: ComputedTweetMode): void;
}

    export class QueryParameterGenerator implements IQueryParameterGenerator
    {
        public  AppendCursorParameters(query: StringBuilder, parameters: ICursorQueryParameters): void
        {
            query.addParameterToQuery("cursor", parameters.cursor);
            query.addParameterToQuery("count", parameters.pageSize);
        }

        public  GenerateCountParameter(count: number): string
        {
            if (count == -1)
            {
                return string.Empty;
            }

            return string.Format(Resources.QueryParameter_Count, count);
        }

        public  GenerateTrimUserParameter(trimUser?: boolean): string
        {
            if (trimUser == null)
            {
                return string.Empty;
            }

            return string.Format(Resources.QueryParameter_TrimUser, trimUser);
        }

        public  GenerateSinceIdParameter(sinceId?: number): string
        {
            if (sinceId == null || sinceId <= 0)
            {
                return string.Empty;
            }

            return string.Format(Resources.QueryParameter_SinceId, sinceId);
        }

        public  GenerateMaxIdParameter(maxId?: number): string
        {
            if (maxId == null || maxId <= 0)
            {
                return string.Empty;
            }

            return string.Format(Resources.QueryParameter_MaxId, maxId);
        }

        public  GenerateIncludeEntitiesParameter(includeEntities?: boolean): string
        {
            if (includeEntities == null)
            {
                return string.Empty;
            }

            return string.Format(Resources.QueryParameter_IncludeEntities, includeEntities);
        }

        public  GenerateSkipStatusParameter(skipStatus: boolean): string
        {
            return string.Format(Resources.QueryParameter_SkipStatus, skipStatus);
        }

        public  GeneratePageNumberParameter(pageNumber?: number): string
        {
            if (pageNumber == null)
            {
                return string.Empty;
            }

            return string.Format(Resources.QueryParameter_PageNumber, pageNumber);
        }

        public  GenerateIncludeRetweetsParameter(includeRetweets: boolean): string
        {
            return string.Format(Resources.QueryParameter_IncludeRetweets, includeRetweets);
        }

        public  GenerateLanguageParameter(language?: Language): string
        {
            let languageParameter = string.Empty;
            if (language != null && language.Value != Language.Undefined)
            {
                var languageCode = language.Value.GetLanguageCode();
                if (!string.IsNullOrEmpty(languageCode))
                {
                    languageParameter = `lang=${languageCode}`;
                }
            }

            return languageParameter;
        }

        public  GenerateCursorParameter(cursor: string): string
        {
            return string.IsNullOrEmpty(cursor) ? "" : string.Format(Resources.QueryParameter_Cursor, cursor);
        }

        public  GenerateTweetIdentifier(tweetId: ITweetIdentifier): string
        {
            return tweetId.idStr ?? tweetId.id.toString();
        }

        public  GenerateAdditionalRequestParameters(additionalParameters: string, existingParameters: boolean = true): string
        {
            if (!additionalParameters)
            {
                return string.Empty;
            }

            return `${(existingParameters ? "&" : "?")}${additionalParameters}`;
        }

        public  AddMinMaxQueryParameters(query: StringBuilder, parameters: IMinMaxQueryParameters): void
        {
            query.addParameterToQuery("count", parameters.PageSize);
            query.addParameterToQuery("since_id", parameters.SinceId);
            query.addParameterToQuery("max_id", parameters.MaxId);
        }

        public  AddTimelineParameters(query: StringBuilder, parameters: ITimelineRequestParameters, tweetMode: ComputedTweetMode): void
        {
            AddMinMaxQueryParameters(query, parameters);
            query.addParameterToQuery("include_entities", parameters.IncludeEntities);
            query.addParameterToQuery("trim_user", parameters.TrimUser);
            query.addParameterToQuery("tweet_mode", tweetMode);
        }

        public  GenerateOEmbedAlignmentParameter(alignment?: OEmbedTweetAlignment): string
        {
            if (alignment == null)
            {
                return null;
            }

            switch (alignment)
            {
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

        public  GenerateOEmbedThemeParameter(theme?: OEmbedTweetTheme): string
        {
            if (theme == null)
            {
                return null;
            }

            switch (theme)
            {
                case OEmbedTweetTheme.Light:
                    return "light";
                case OEmbedTweetTheme.Dark:
                    return "dark";
                default:
                    return null;
            }
        }
    }
}
