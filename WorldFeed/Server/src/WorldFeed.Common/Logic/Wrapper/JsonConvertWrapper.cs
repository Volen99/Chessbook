namespace WorldFeed.Logic.Wrapper
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Wrappers;

    // Wrapper classes "cannot" be tested
    public class JsonConvertWrapper : IJsonConvertWrapper
    {
        public string SerializeObject(object o)
        {
            return JsonConvert.SerializeObject(o);
        }

        public string SerializeObject(object o, JsonConverter[] converters)
        {
            return JsonConvert.SerializeObject(o, converters);
        }

        public T DeserializeObject<T>(string json)
        {
            return JsonConvert.DeserializeObject<T>(json);
        }

        public T DeserializeObject<T>(string json, JsonConverter[] converters)
        {   
            var type = typeof(T);

           // json = "{\"screen_name\":\"Volen99\",\"protected\":1,\"language\":26,\"always_use_https\":true,\"discoverable_by_email\":true,\"discoverable_by_mobile_phone\":false,\"geo_enabled\":false,\"use_cookie_personalization\":true,\"allow_contributor_request\":2,\"allow_dms_from\":0,\"allow_dm_groups_from\":0,\"time_zone\":{\"name\":\"UTC\",\"tzinfo_name\":\"Etc/UTC\",\"utc_offset\":0},\"display_sensitive_media\":false,\"smart_mute\":false,\"sleep_time\":{\"enabled\":false,\"start_time\":0,\"end_time\":0},\"SleepTimeEnabled\":false,\"SleepTimeStartHour\":0,\"SleepTimeEndHour\":0,\"translator_type\":null,\"trend_location\":[{\"woeid\":2357024,\"name\":\"Atlanta\",\"country\":\"Bulgaria\",\"countryCode\":\"bg\",\"url\":\"http://where.yahooapis.com/v1/place/2357024\",\"parentid\":23424977,\"PlaceType\":7,\"placeType\":{\"name\":null,\"code\":7}}]}";

            return JsonConvert.DeserializeObject<T>(json, converters);
        }
    }
}
