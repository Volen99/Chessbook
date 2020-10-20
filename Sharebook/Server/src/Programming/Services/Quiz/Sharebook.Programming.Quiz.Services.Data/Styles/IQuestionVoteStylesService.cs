using System.Collections.Generic;
using System.Threading.Tasks;

using WorldFeed.Programming.Quiz.Data.Models.Styles;

namespace WorldFeed.Programming.Quiz.Services.Data.Styles
{
    public interface IQuestionVoteStylesService
    {
        Task<QuestionVoteStyles> CreateAsync(string userId, int questionId);

        T GetById<T>(string userId, int questionId);

        T GetByQuestionId<T>(int questionId);

        IEnumerable<T> GetByUserId<T>(string userId, int? count = null);

        IEnumerable<T> GetAll<T>(int? count = null);

        Task<T> UpdateQuestionVote<T>(string userId, int questionId, bool isUpVote);

        void DeleteByUserId(string userId);
    }
}
