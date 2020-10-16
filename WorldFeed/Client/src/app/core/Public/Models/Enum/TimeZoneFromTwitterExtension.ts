
    export static class TimeZoneFromTwitterExtension
    {
        public static  ToTZinfo(this TimeZoneFromTwitter language): string
        {
            var field = language.GetType().GetField(language.ToString());
            var descriptionAttribute = (TimeZoneFromTwitterAttribute)CustomAttributeExtensions.GetCustomAttribute(field, typeof(TimeZoneFromTwitterAttribute));

            return descriptionAttribute != null ? descriptionAttribute.TZinfo : language.ToString();
        }
    }
