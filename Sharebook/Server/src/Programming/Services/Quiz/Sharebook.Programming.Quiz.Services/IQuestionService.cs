using System.Collections.Generic;
using System.Threading.Tasks;

using WorldFeed.Programming.Quiz.Data.Models;

namespace WorldFeed.Programming.Quiz.Services
{
    public interface IQuestionService
    {
        T GetById<T>(int id);

        IEnumerable<T> GetAll<T>(int? count = null);

        Task<Questions> UpdateCurrentQuestion(int currentQuestionId, string answerValue);

        Task<int> RemoveQuestion(int userQuizTokenId, int currentQuestionId);
    }
}
