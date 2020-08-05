namespace WorldFeed.Common.Public.Models.Enums
{
    using System.Reflection;

    using WorldFeed.Common.Attributes;

    public static class TimeZoneFromTwitterExtension
    {
        public static string ToTZinfo(this TimeZoneFromTwitter language)
        {
            var field = language.GetType().GetField(language.ToString());
            var descriptionAttribute = (TimeZoneFromTwitterAttribute)CustomAttributeExtensions.GetCustomAttribute(field, typeof(TimeZoneFromTwitterAttribute));

            return descriptionAttribute != null ? descriptionAttribute.TZinfo : language.ToString();
        }
    }
}
