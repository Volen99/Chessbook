import {IHelpQueryGenerator} from "../../core/Core/QueryGenerators/IHelpQueryGenerator";
import {Resources} from "../../properties/resources";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {ICoordinates} from "../../core/Public/Models/Interfaces/ICoordinates";
import ArgumentNullException from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException";
import ArgumentException from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException";
import {IGetRateLimitsParameters} from "../../core/Public/Parameters/HelpClient/GetRateLimitsParameters";
import {IGetTwitterConfigurationParameters} from "../../core/Public/Parameters/HelpClient/GetTwitterConfigurationParameters";
import {IGetSupportedLanguagesParameters} from "../../core/Public/Parameters/HelpClient/GetSupportedLanguagesParameters";
import {IGetPlaceParameters} from "../../core/Public/Parameters/HelpClient/GetPlaceParameters";
import {AccuracyMeasure, Granularity, IGeoSearchParameters} from "../../core/Public/Parameters/HelpClient/GeoSearchParameters";
import {IGeoSearchReverseParameters} from "../../core/Public/Parameters/HelpClient/GeoSearchReverseParameters";

export class HelpQueryGenerator implements IHelpQueryGenerator
    {
        public  getRateLimitsQuery(parameters: IGetRateLimitsParameters): string
        {
            let query = new StringBuilder(Resources.Help_GetRateLimit);
            query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
            return query.toString();
        }

        public  getTwitterConfigurationQuery(parameters: IGetTwitterConfigurationParameters): string
        {
          let query = new StringBuilder(Resources.Help_GetTwitterConfiguration);
            query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
            return query.toString();
        }

        public  getSupportedLanguagesQuery(parameters: IGetSupportedLanguagesParameters): string
        {
          let query = new StringBuilder(Resources.Help_GetSupportedLanguages);
            query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
            return query.toString();
        }

        public  getPlaceQuery(parameters: IGetPlaceParameters): string
        {
            let query = new StringBuilder(string.Format(Resources.Geo_GetPlaceFromId, parameters.placeId));
            query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
            return query.toString();
        }

        public  GenerateGeoParameter(coordinates: ICoordinates): string
        {
            if (coordinates == null)
            {
                throw new ArgumentNullException(nameof(coordinates));
            }

          let latitudeValue: string = coordinates.latitude.toString(CultureInfo.InvariantCulture);
          let longitudeValue: string = coordinates.longitude.toString(CultureInfo.InvariantCulture);

            return string.Format(Resources.Geo_CoordinatesParameter, longitudeValue, latitudeValue);
        }

        public  getSearchGeoQuery(parameters: IGeoSearchParameters): string
        {
            if (string.IsNullOrEmpty(parameters.query) &&
                string.IsNullOrEmpty(parameters.ip) &&
                parameters.coordinates == null &&
                parameters.attributes.IsNullOrEmpty())
            {
                throw new ArgumentException("You must provide valid coordinates, Ip address, query, or attributes.");
            }

            let query = new StringBuilder(Resources.Geo_SearchGeo);

            query.addParameterToQuery("query", parameters.query);
            query.addParameterToQuery("ip", parameters.ip);

            if (parameters.coordinates != null)
            {
                query.addParameterToQuery("lat", parameters.coordinates.latitude);
                query.addParameterToQuery("long", parameters.coordinates.longitude);
            }

            for (let attribute of parameters.attributes)
            {
                query.addParameterToQuery(string.Format("attribute:{0}", attribute.Key), attribute.Value);
            }

            if (parameters.granularity !== Granularity.Undefined)
            {
                query.addParameterToQuery("granularity", parameters.granularity.ToString().ToLowerInvariant());
            }

            if (parameters.accuracy != null)
            {
                let accuracyMeasure = parameters.accuracyMeasure === AccuracyMeasure.Feets ? "ft" : "m";
                query.addParameterToQuery("accuracy", $"{parameters.Accuracy}{accuracyMeasure}");
            }

            query.addParameterToQuery("max_results", parameters.maximumNumberOfResults);
            query.addParameterToQuery("contained_within", parameters.containedWithin);
            query.addParameterToQuery("callback", parameters.callback);

            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.toString();
        }

        public  getSearchGeoReverseQuery(parameters: IGeoSearchReverseParameters): string
        {
            if (parameters.coordinates == null)
            {
                throw new ArgumentException("You must provide valid coordinates.");
            }

            let query = new StringBuilder(Resources.Geo_SearchGeoReverse);

            if (parameters.coordinates != null)
            {
                query.addParameterToQuery("lat", parameters.coordinates.latitude);
                query.addParameterToQuery("long", parameters.coordinates.longitude);
            }

            if (parameters.granularity !== Granularity.Undefined)
            {
                query.addParameterToQuery("granularity", parameters.granularity.toString().toLocaleLowerCase());
            }

            query.addParameterToQuery("accuracy", parameters.accuracy);
            query.addParameterToQuery("max_results", parameters.maximumNumberOfResults);
            query.addParameterToQuery("callback", parameters.callback);

            query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

            return query.toString();
        }

        public  GetPlaceFromIdQuery(placeId: string): string
        {
            if (placeId == null)
            {
                throw new ArgumentNullException(nameof(placeId));
            }

            if (placeId === "")
            {
                throw new ArgumentException("Cannot be empty", nameof(placeId));
            }

            return string.Format(Resources.Geo_GetPlaceFromId, placeId);
        }
    }
}
