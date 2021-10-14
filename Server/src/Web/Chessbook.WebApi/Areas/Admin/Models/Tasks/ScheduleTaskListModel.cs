using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Areas.Admin.Models.Tasks
{
    /// <summary>
    /// Represents a schedule task list model
    /// </summary>
    public partial record ScheduleTaskListModel : BasePagedListModel<ScheduleTaskModel>
    {
    }
}