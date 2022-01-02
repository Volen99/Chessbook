using System.Threading.Tasks;
using Chessbook.Common.Feedback;

namespace Chessbook.Services.Feedback
{
    /// <summary>
    /// Defines the methods to be implemented by the CustomerFeedbackService.
    /// </summary>
    public interface IUserFeedbackService
    {
        Task SendFeedback(UserFeedback feedback);
    }
}
