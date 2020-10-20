using System.Linq;
using System.Threading.Tasks;

using WorldFeed.Programming.Quiz.Data.Common.Repositories;
using WorldFeed.Programming.Quiz.Data.Models.Timer;

namespace WorldFeed.Programming.Quiz.Services.Data.Timer
{
    public class TimerService : ITimerService
    {
        private readonly IRepository<QuizTimer> timersRepositroy;

        public TimerService(IRepository<QuizTimer> timersRepositroy)
        {
            this.timersRepositroy = timersRepositroy;
        }

        public async Task CreateAsync(int userQuizTokenId)
        {
            var quizTimer = new QuizTimer
            {
                UserQuizTokenId = userQuizTokenId,
            };

            await this.timersRepositroy.AddAsync(quizTimer);
            await this.timersRepositroy.SaveChangesAsync();
        }

        public QuizTimer GetTimer(int id)
        {
            var timerCurrent = this.timersRepositroy.All()
                .Where(x => x.UserQuizTokenId == id)
                .FirstOrDefault();

            if (timerCurrent == null)
            {
                return null;
            }

            return timerCurrent;
        }
    }
}
