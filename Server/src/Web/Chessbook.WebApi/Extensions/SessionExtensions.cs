namespace Chessbook.Web.Api.Extensions
{
    using Chessbook.Data.Models.Memory;

    public static class SessionExtensions
    {
        // My first, ever, extension method thought by mi?? 😮 13.11.2020, Friday, 12:17 | 1 Hour of H.P. Lovecraft Music: The Great Old Ones and Other Beings
        public static string GetMediaIdForFile(this Session session, long mediaId)
        {
            var fileId = mediaId % 3;

            if (fileId == 0)
            {
                fileId = 3;
            }

            return fileId.ToString();
        }
    }
}
