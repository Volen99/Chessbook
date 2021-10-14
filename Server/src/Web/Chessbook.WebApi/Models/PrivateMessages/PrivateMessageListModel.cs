using System.Collections.Generic;
using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.PrivateMessages
{
    public partial record PrivateMessageListModel : BaseNopModel
    {
        public IList<PrivateMessageModel> Messages { get; set; }
        // public PagerModel PagerModel { get; set; }
    }
}