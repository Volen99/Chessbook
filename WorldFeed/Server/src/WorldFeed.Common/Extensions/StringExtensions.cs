namespace WorldFeed.Common.Extensions
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Text.RegularExpressions;

    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Public;

    public static class StringExtensions
    {
        private static Regex _linkParser;
        private static readonly HttpUtility _httpUtility = new HttpUtility();


        // You think I wrote this? ;dd 21.07.2020, Tuesday | А я хочу с тобой просто жить ❤
        private const string TWITTER_URL_REGEX =
            @"(?<=^|\s+)" +                                            // URL can be prefixed by space or start of line
            @"\b(?<start>http(?<isSecured>s?)://(?:www\.)?|www\.|)" +  // Start of an url
            @"(?!www\.)" +                                             // The first keyword cannot be www.
            @"(?<firstPathElement>\w+([\w-]*\w+)?\.)" +                // first keyword required
            @"(?<secondPathElement>\w+[\w-]*\w+)\w*?" +                // second keyword required
            @"(?<multiplePathElements>(?:\.\w+[\w-]*\w+)*)" +          // potential sub-sites
            @"?\.{0}" +                                                // . is forbidden at this stage
            @"(?<specialChar>[/?])?" +                                 // is there a character specifying the url will be extended
            @"(?(specialChar)" +                                       // has a specialChar been detected
            @"(?:" +                                                   // if so
            @"(?:(?:\w|\d)+)" +                                        // Get all the letters
            @"(?:(?:\p{P}|=)+)" +                                      // Followed by at least 1 or multiple punctuation (twitter behavior)
            @")*(?:(?:\w|\d)+))" +                                     // And the end should be a literal char
            @"(?<lastChar>[/?])?";                                     // Or a '/'

        public static DateTime TryGetDate(this string date)
        {
            try
            {
                return DateTime.ParseExact(date, "dd/MM/yyyy", null);
            }
            catch (Exception)
            {
                return new DateTime(2010, 1, 1);
            }
        }

        public static byte[] ToByteArray(this string sourceString)
        {
            var encoding = new UTF8Encoding();
            return encoding.GetBytes(sourceString);
        }

        public static int ToInteger(this string input)
        {
            int integerValue;
            int.TryParse(input, out integerValue);
            return integerValue;
        }

        public static string ToUrl(this string uglyString)
        {
            var resultString = new StringBuilder(uglyString.Length);
            bool isLastCharacterDash = false;

            uglyString = uglyString.Replace("C#", "CSharp");
            uglyString = uglyString.Replace("C++", "CPlusPlus");

            foreach (var character in uglyString)
            {
                if (char.IsLetterOrDigit(character))
                {
                    resultString.Append(character);
                    isLastCharacterDash = false;
                }
                else if (!isLastCharacterDash)
                {
                    resultString.Append('-');
                    isLastCharacterDash = true;
                }
            }

            return resultString.ToString().Trim('-');
        }

        public static string Repeat(this string input, int count)
        {
            var builder = new StringBuilder((input?.Length ?? 0) * count);

            for (int i = 0; i < count; i++)
            {
                builder.Append(input);
            }

            return builder.ToString();
        }

        public static string GetFileExtension(this string fileName)
        {
            if (string.IsNullOrWhiteSpace(fileName))
            {
                return string.Empty;
            }

            string[] fileParts = fileName.Split(new[] { "." }, StringSplitOptions.None);
            if (fileParts.Length == 1 || string.IsNullOrEmpty(fileParts.Last()))
            {
                return string.Empty;
            }

            return fileParts.Last().Trim().ToLower();
        }

        public static string MaxLength(this string stringToTrim, int maxLength)
        {
            if (stringToTrim == null || stringToTrim.Length <= maxLength)
            {
                return stringToTrim;
            }

            return stringToTrim.Substring(0, maxLength);
        }


        // Create on demand
        private static Regex LinkParser
        {
            get
            {
                if (_linkParser == null)
                {
                    _linkParser = new Regex(TWITTER_URL_REGEX, RegexOptions.IgnoreCase);
                }

                return _linkParser;
            }
        }

        public static int EstimateTweetLength(string tweet, bool willBePublishedWithMedia = false)
        {
            if (tweet == null)
            {
                return 0;
            }

            int length = UnicodeHelper.UTF32Length(tweet);

            foreach (Match link in LinkParser.Matches(tweet))
            {
                // If an url ends with . and 2 followed chars twitter does not consider it as an URL
                if (link.Groups["start"].Value == string.Empty &&
                    link.Groups["multiplePathElements"].Value == string.Empty &&
                    link.Groups["secondPathElement"].Value.Length < 2 &&
                    link.Groups["specialChar"].Value == string.Empty &&
                    link.Groups["lastChar"].Value != "/")
                {
                    continue;
                }

                var isHttps = link.Groups["isSecured"].Value == "s";
                var linkSize = isHttps ? TweetinviConsts.HTTPS_LINK_SIZE : TweetinviConsts.HTTP_LINK_SIZE;

                length = length - link.Value.Length + linkSize;
            }

            if (willBePublishedWithMedia)
            {
                length += TweetinviConsts.MEDIA_CONTENT_SIZE;
            }

            return length;
        }

        // TODO: Unit test
        public static string MaxLengthWithEllipsis(this string stringToTrim, int maxLength)
        {
            if (stringToTrim == null || stringToTrim.Length <= maxLength)
            {
                return stringToTrim;
            }

            return stringToTrim.Substring(0, maxLength) + "...";
        }

        // TODO: Test
        public static IEnumerable<string> GetStringsBetween(this string stringToParse, string beforeString, string afterString)
        {
            var regEx = new Regex(Regex.Escape(beforeString) + "(.*?)" + Regex.Escape(afterString), RegexOptions.Singleline | RegexOptions.Compiled);
            var matches = regEx.Matches(stringToParse);
            foreach (Match match in matches)
            {
                yield return match.Groups[1].Value;
            }
        }

        // TODO: Test
        public static string GetStringBetween(this string stringToParse, string beforeString, string afterString)
        {
            var strings = stringToParse.GetStringsBetween(beforeString, afterString).ToList();
            if (!strings.Any())
            {
                return null;
            }

            return strings[0];
        }

        public static string GetStringWithEllipsisBetween(this string input, int startIndex, int endIndex)
        {
            string result = null;

            if (input != null)
            {
                if (startIndex == endIndex)
                {
                    result = string.Empty;
                }
                else
                {
                    const string Ellipsis = "...";

                    result = string.Format(
                        "{0}{1}{2}",
                        startIndex > Ellipsis.Length ? Ellipsis : string.Empty,
                        input.Substring(startIndex, endIndex - startIndex),
                        input.Length - endIndex > Ellipsis.Length ? Ellipsis : string.Empty);
                }
            }

            return result;
        }

        public static int GetFirstDifferenceIndexWith(this string input, string other, bool ignoreCase = false)
        {
            var firstDifferenceIndex = -1;

            if (input != null && other != null)
            {
                var maxIndex = Math.Min(input.Length, other.Length);
                for (var i = 0; i < maxIndex; i++)
                {
                    var areEqualChars = ignoreCase ?
                        char.ToUpperInvariant(input[i]) == char.ToUpperInvariant(other[i]) :
                        input[i] == other[i];
                    if (!areEqualChars)
                    {
                        firstDifferenceIndex = i;
                        break;
                    }
                }

                if (firstDifferenceIndex < 0 && input.Length != other.Length)
                {
                    firstDifferenceIndex = maxIndex;
                }
            }

            if (input == null ^ other == null)
            {
                firstDifferenceIndex = 0;
            }

            return firstDifferenceIndex;
        }

        // TODO: Test
        public static string ToValidFileName(this string input)
        {
            var invalidCharacters = Path.GetInvalidFileNameChars();
            var fixedString = new StringBuilder(input);
            foreach (var ch in invalidCharacters)
            {
                fixedString.Replace(ch, '_');
            }

            return fixedString.ToString();
        }

        // TODO: Test
        public static string ToValidFilePath(this string input)
        {
            var invalidCharacters = Path.GetInvalidPathChars();
            var fixedString = new StringBuilder(input);
            foreach (var ch in invalidCharacters)
            {
                fixedString.Replace(ch, '_');
            }

            return fixedString.ToString();
        }

        public static string PascalCaseToText(this string input)
        {
            if (input == null)
            {
                return null;
            }

            const char WhiteSpace = ' ';

            var result = new StringBuilder();
            var currentWord = new StringBuilder();
            var abbreviation = new StringBuilder();

            char previous = WhiteSpace;
            bool inWord = false;
            bool isAbbreviation = false;

            for (int i = 0; i < input.Length; i++)
            {
                char symbolToAdd = input[i];

                if (char.IsUpper(symbolToAdd) && previous == WhiteSpace && !inWord)
                {
                    inWord = true;
                    isAbbreviation = true;
                    abbreviation.Append(symbolToAdd);
                }
                else if (char.IsUpper(symbolToAdd) && inWord)
                {
                    abbreviation.Append(symbolToAdd);
                    currentWord.Append(WhiteSpace);
                    symbolToAdd = char.ToLower(symbolToAdd);
                }
                else if (char.IsLower(symbolToAdd) && inWord)
                {
                    isAbbreviation = false;
                }
                else if (symbolToAdd == WhiteSpace)
                {
                    result.Append(isAbbreviation && abbreviation.Length > 1 ? abbreviation.ToString() : currentWord.ToString());
                    currentWord.Clear();
                    abbreviation.Clear();

                    if (result.Length > 0)
                    {
                        abbreviation.Append(WhiteSpace);
                    }

                    inWord = false;
                    isAbbreviation = false;
                }

                previous = symbolToAdd;
                currentWord.Append(symbolToAdd);
            }

            if (currentWord.Length > 0)
            {
                result.Append(isAbbreviation && abbreviation.Length > 1 ? abbreviation.ToString() : currentWord.ToString());
            }

            return result.ToString();
        }

        public static string AddParameterToQuery(this string query, string parameterName, string parameterValue)
        {
            if (string.IsNullOrEmpty(parameterName) || string.IsNullOrEmpty(parameterValue))
            {
                return query;
            }

            if (query.Contains("?") && query[query.Length - 1] != '?' && query[query.Length - 1] != '&')
            {
                query += "&";
            }

            if (!query.Contains("?"))
            {
                query += "?";
            }

            query += $"{parameterName}={parameterValue}";

            return query;
        }

        public static string GetURLParameter(this string url, string parameterName)
        {
            if (url == null)
            {
                return null;
            }

            var urlInformation = Regex.Match(url, $"{parameterName}=(?<parameter_value>[^&]*)");

            if (!urlInformation.Success)
            {
                return null;
            }

            return urlInformation.Groups["parameter_value"].Value;
        }

        public static void AddParameterToQuery(this StringBuilder queryBuilder, string parameterName, string parameterValue)
        {
            if (string.IsNullOrEmpty(parameterName) || string.IsNullOrEmpty(parameterValue))
            {
                return;
            }

            var query = queryBuilder.ToString();

            if (query.Contains("?") && query[query.Length - 1] != '?' && query[query.Length - 1] != '&')
            {
                queryBuilder.Append("&");
            }

            if (!query.Contains("?"))
            {
                queryBuilder.Append("?");
            }

            queryBuilder.Append($"{parameterName}={Uri.EscapeDataString(parameterValue)}");
        }

        public static void AddParameterToQuery<T>(this StringBuilder queryBuilder, string parameterName, T parameterValue)
        {
            if (string.IsNullOrEmpty(parameterName) || parameterValue == null)
            {
                return;
            }

            var type = typeof(T);
            if (Nullable.GetUnderlyingType(type) != null)
            {
                var stringValue = parameterValue.ToString();
                var typeofValue = parameterValue.GetType().ToString();

                if (stringValue == typeofValue)
                {
                    return;
                }

                var doubleValue = parameterValue as double?;
                if (doubleValue != null)
                {
                    stringValue = doubleValue.Value.ToString(CultureInfo.InvariantCulture);
                }

                AddParameterToQuery(queryBuilder, parameterName, stringValue.ToLowerInvariant());
            }
            else
            {
                var stringValue = parameterValue.ToString();

                if (parameterValue is double)
                {
                    stringValue = ((double)(object)parameterValue).ToString(CultureInfo.InvariantCulture);
                }

                AddParameterToQuery(queryBuilder, parameterName, stringValue.ToLowerInvariant());
            }
        }

        public static void AddFormattedParameterToQuery(this StringBuilder queryBuilder, string parameter)
        {
            if (string.IsNullOrEmpty(parameter))
            {
                return;
            }

            if (parameter.StartsWith("?"))
            {
                parameter = parameter.Substring(1);
            }

            var query = queryBuilder.ToString();

            if (query.Contains("?") && query[query.Length - 1] != '?' && query[query.Length - 1] != '&' && parameter[0] != '&')
            {
                queryBuilder.Append("&");
            }

            if (!query.Contains("?"))
            {
                queryBuilder.Append("?");
            }

            queryBuilder.Append(parameter);
        }

        public static void AddFormattedParameterToParametersList(this StringBuilder queryBuilder, string parameter)
        {
            if (string.IsNullOrEmpty(parameter))
            {
                return;
            }

            var query = queryBuilder.ToString();

            if ((query.Length == 0 || query[query.Length - 1] != '&') && parameter[0] != '&')
            {
                queryBuilder.Append("&");
            }

            queryBuilder.Append(parameter);
        }

        public static bool IsMatchingJsonFormat(this string json)
        {
            return !string.IsNullOrEmpty(json) && json.Length >= 2 && ((json[0] == '{' && json[json.Length - 1] == '}') || (json[0] == '[' && json[json.Length - 1] == ']'));
        }
    }
}
