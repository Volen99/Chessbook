namespace WorldFeed.Common.Attributes
{
    using System;

    public class TweetSearchFilterAttribute : Attribute
    {
        public TweetSearchFilterAttribute(string filterName)
        {
            FilterName = filterName;
        }

        public string FilterName { get; }
    }
}
