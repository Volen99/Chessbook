namespace Sharebook.Logic.Helpers
{
    using System;

    using Sharebook.Common.Helpers;

    public class TwitterStringFormatter : ITwitterStringFormatter
    {
        public string TwitterEncode(string source)
        {
            if (source == null)
            {
                return string.Empty;
            }

            return Uri.EscapeDataString(source);
        }

        public string TwitterDecode(string source)
        {
            if (source == null)
            {
                return string.Empty;
            }

            return Uri.UnescapeDataString(source);
        }
    }
}
