﻿namespace WorldFeed.Common.Web
{
    using System.Collections.Generic;
    using System.IO;

    public static class WebRequestResultExtension
    {
        public static string ToJson(this ITwitterResponse twitterResponse)
        {
            var resultStream = twitterResponse.ResultStream;
            if (resultStream != null)
            {
                var responseReader = new StreamReader(resultStream);
                var json = responseReader.ReadLine();

                return json;
            }

            return null;
        }

        public static byte[] ToBinary(this ITwitterResponse twitterResponse)
        {
            var stream = twitterResponse.ResultStream;

            if (stream == null)
            {
                return null;
            }

            byte[] binary;

            using (var tempMemStream = new MemoryStream())
            {
                byte[] buffer = new byte[128];

                while (true)
                {
                    int read = stream.Read(buffer, 0, buffer.Length);

                    if (read <= 0)
                    {
                        binary = tempMemStream.ToArray(); break;
                    }

                    tempMemStream.Write(buffer, 0, read);
                }
            }

            return binary;
        }
    }

    public interface ITwitterResponse
    {
        /// <summary>
        /// Query url.
        /// </summary>
        string URL { get; set; }

        /// <summary>
        /// Resulting stream to retrieve the data.
        /// </summary>
        Stream ResultStream { get; set; }

        /// <summary>
        /// Status Code of the query execution.
        /// </summary>
        int StatusCode { get; set; }

        /// <summary>
        /// Inform whether the query has succeeded.
        /// </summary>
        bool IsSuccessStatusCode { get; set; }

        /// <summary>
        /// Headers of the response.
        /// </summary>
        Dictionary<string, IEnumerable<string>> Headers { get; set; }

        byte[] Binary { get; set; }
        string Content { get; set; }
    }
}
