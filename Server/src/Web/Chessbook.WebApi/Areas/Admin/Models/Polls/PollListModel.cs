using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Areas.Admin.Models.Polls
{
    /// <summary>
    /// Represents a poll list model
    /// </summary>
    public partial record PollListModel : BasePagedListModel<PollModel>
    {
    }
}