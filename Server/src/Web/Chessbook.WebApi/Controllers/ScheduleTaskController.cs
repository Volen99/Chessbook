using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Services.Tasks;

using Task = Chessbook.Services.Tasks.Task;


namespace Chessbook.Web.Api.Controllers
{
    // do not inherit it from BasePublicController. otherwise a lot of extra action filters will be called
    // they can create guest account(s), etc
    [Route("scheduletask")]
    public partial class ScheduleTaskController : Controller
    {
        private readonly IScheduleTaskService _scheduleTaskService;

        public ScheduleTaskController(IScheduleTaskService scheduleTaskService)
        {
            _scheduleTaskService = scheduleTaskService;
        }

        [HttpPost]
        [IgnoreAntiforgeryToken]
        [Route("runtask")]
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task<IActionResult> RunTask(string taskType)
        {
            var scheduleTask = await _scheduleTaskService.GetTaskByTypeAsync(taskType);
            if (scheduleTask == null)
                // schedule task cannot be loaded
                return NoContent();

            var task = new Task(scheduleTask);
            await task.ExecuteAsync();

            return NoContent();
        }
    }
}
