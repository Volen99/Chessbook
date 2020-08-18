using System.Threading.Tasks;

using WorldFeed.Programming.Quiz.Data.Models.Timer;

namespace WorldFeed.Programming.Quiz.Services.Data.Timer
{
    public interface ITimerService
    {
        Task CreateAsync(int userQuizTokenId);
        
        QuizTimer GetTimer(int id);
    }
}
