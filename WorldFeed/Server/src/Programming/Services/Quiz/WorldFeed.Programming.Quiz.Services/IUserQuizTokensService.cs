using System.Collections.Generic;
using System.Threading.Tasks;

using WorldFeed.Programming.Quiz.Data.Models;

namespace WorldFeed.Programming.Quiz.Services
{
    public interface IUserQuizTokensService
    {
        T GetById<T>(int userQuizTokensId);

        IEnumerable<T> GetAll<T>(int? count = null);

        Task SetInitialUserQuizTokens(int userQuizTokensId, int lives);

        Task<UserQuizToken> UpdateStreak(int id, bool isQuestionAnsweredCorrectly);

        Task<UserQuizToken> UpdateBonusUfoLives(int userQuizTokensId, int lives);

        Task<UserQuizToken> IncreaseProgress(int userQuizTokensId);

        Task<int> IncreaseSnakeLives(int userQuizTokensId, int lives);

        Task<int> DecreaseLives(int userQuizTokensId);

        Task SetSnakeStatus(int id, bool status);

        bool IsQuestionRepeating(int userQuizTokensId, int currentQuestionId);

        Task IncreaseHackingAttempts(int userQuizTokensId);
    }
}
