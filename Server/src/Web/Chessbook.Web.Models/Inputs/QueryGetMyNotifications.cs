namespace Chessbook.Web.Models.Inputs
{
    public class QueryGetMyNotifications
    {
        public int Start { get; set; }

        public int Count { get; set; }

        public string Sort { get; set; }

        public bool? Unread { get; set; }

    }
}
