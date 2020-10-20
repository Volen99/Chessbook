namespace Sharebook.Upload.API.Helpers
{
    using System.Collections.Generic;
    using System.Text.RegularExpressions;

    using Sharebook.Upload.DTO;

    public class TweetTextParts : ITweetTextParts
    {
        public TweetTextParts(string text)
        {
            var stringMatches = Regex.Match(text, @"^(?<prefix>(?:(?<mention>@[a-zA-Z0-9]+)\s){0,50})?(?<content>.+)");

            var prefix = stringMatches.Groups["prefix"];
            var content = stringMatches.Groups["content"];

            this.Prefix = prefix.Value;
            this.Content = content.Value;

            var mentionCaptures = stringMatches.Groups["mention"].Captures;

            var mentions = new List<string>();
            foreach (var mention in mentionCaptures)
            {
                mentions.Add(mention.ToString());
            }

            this.Mentions = mentions.ToArray();
        }

        public string Content { get; }

        public string Prefix { get; }

        public string[] Mentions { get; }
    }
}
