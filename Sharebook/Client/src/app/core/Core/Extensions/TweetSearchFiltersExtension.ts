import {TweetSearchFilters} from "../../Public/Parameters/Enum/TweetSearchFilters";

export abstract class TweetSearchFiltersExtension
    {
        public static getQueryFilterName(tweetSearchFilters: TweetSearchFilters): string {
            // var field = tweetSearchFilters.GetType().GetField(tweetSearchFilters.ToString());
            // var descriptionAttribute = (TweetSearchFilterAttribute)CustomAttributeExtensions.GetCustomAttribute(field, typeof(TweetSearchFilterAttribute));

            return null // tweetSearchFilters != null ? descriptionAttribute.FilterName : tweetSearchFilters.ToString().ToLowerInvariant();
        }
    }
