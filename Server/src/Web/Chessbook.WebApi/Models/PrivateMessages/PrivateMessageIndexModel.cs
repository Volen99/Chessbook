using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.PrivateMessages
{
    public partial record PrivateMessageIndexModel : BaseNopModel
    {
        public int InboxPage { get; set; }
        public int SentItemsPage { get; set; }
        public bool SentItemsTabSelected { get; set; }
    }
}