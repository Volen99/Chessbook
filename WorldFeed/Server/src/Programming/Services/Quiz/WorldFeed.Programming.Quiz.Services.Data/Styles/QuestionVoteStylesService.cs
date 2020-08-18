using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

using WorldFeed.Programming.Quiz.Data.Common.Repositories;
using WorldFeed.Programming.Quiz.Data.Models.Styles;
using WorldFeed.Programming.Quiz.Services.Mapping;

namespace WorldFeed.Programming.Quiz.Services.Data.Styles
{
    public class QuestionVoteStylesService : IQuestionVoteStylesService
    {
        private const string THUMBS_UP_QUESTION_PATH = @"/images/thumbs-up-question.png";
        private const string THUMBS_UP_QUESTION_LIKED_PATH = @"/images/thumbs-up-question-liked.png";
        private const string THUMBS_DOWN_QUESTION_PATH = @"/images/thumbs-down-question.png";
        private const string THUMBS_DOWN_QUESTION_DISLIKED = @"/images/thumbs-up-question-disliked.png";

        private readonly IDeletableEntityRepository<QuestionVoteStyles> questionVoteStylesRepository;

        public QuestionVoteStylesService(
            IDeletableEntityRepository<QuestionVoteStyles> questionVoteStylesRepository)
        {
            this.questionVoteStylesRepository = questionVoteStylesRepository;
        }

        public async Task<QuestionVoteStyles> CreateAsync(string userId, int questionId)
        {
            var questionVoteStylesNew = new QuestionVoteStyles
            {
                QuestionLiked = "inherit",
                QuestionDisliked = "inherit",
                UserId = userId,
                QuestionId = questionId,
            };

            await this.questionVoteStylesRepository.AddAsync(questionVoteStylesNew);
            await this.questionVoteStylesRepository.SaveChangesAsync();

            return questionVoteStylesNew;
        }

        public T GetById<T>(string userId, int questionId)
        {
            var questionVoteStylesCurrent = this.questionVoteStylesRepository.All()
               .Where(u => u.UserId == userId)
               .Where(q => q.QuestionId == questionId)
               .To<T>()
               .FirstOrDefault();

            return questionVoteStylesCurrent;
        }

        public IEnumerable<T> GetByUserId<T>(string userId, int? count = null)
        {
            var questionsVoteStyles = this.questionVoteStylesRepository.All()
                .Where(s => s.UserId == userId)
                .To<T>();

            if (count.HasValue)
            {
                questionsVoteStyles = questionsVoteStyles.Take(count.Value);
            }

            return questionsVoteStyles;
        }

        public T GetByQuestionId<T>(int questionId)
        {
            var questionVoteStylesCurrent = this.questionVoteStylesRepository.All()
                .Where(x => x.QuestionId == questionId)
                .To<T>()
                .FirstOrDefault();

            return questionVoteStylesCurrent;
        }

        public IEnumerable<T> GetAll<T>(int? count = null)
        {
            var questionVoteStyles = this.questionVoteStylesRepository.All()
                .To<T>();

            if (count.HasValue)
            {
                questionVoteStyles = questionVoteStyles.Take(count.Value);
            }

            return questionVoteStyles;
        }

        public async Task<T> UpdateQuestionVote<T>(string userId, int questionId, bool isUpVote)
        {
            var userQuestionVoteStylesCurrent = this.questionVoteStylesRepository.All()
                .Where(ui => ui.UserId == userId)
                .FirstOrDefault(c => c.QuestionId == questionId);

            if (userQuestionVoteStylesCurrent == null)
            {
                userQuestionVoteStylesCurrent = await this.CreateAsync(userId, questionId);
            }

            if (isUpVote)
            {
                userQuestionVoteStylesCurrent.QuestionLiked = THUMBS_UP_QUESTION_LIKED_PATH;
                userQuestionVoteStylesCurrent.QuestionDisliked = THUMBS_DOWN_QUESTION_PATH;
            }
            else
            {
                userQuestionVoteStylesCurrent.QuestionLiked = THUMBS_UP_QUESTION_PATH;
                userQuestionVoteStylesCurrent.QuestionDisliked = THUMBS_DOWN_QUESTION_DISLIKED;
            }

            await this.questionVoteStylesRepository.SaveChangesAsync();

            var result = this.questionVoteStylesRepository.All()
                .Where(ui => ui.UserId == userId)
                .Where(c => c.QuestionId == questionId)
                .To<T>()
                .FirstOrDefault();

            return result;
        }

        public void DeleteByUserId(string userId)
        {
            var userQuestionVoteStyles = this.questionVoteStylesRepository.All()
                .Where(x => x.UserId == userId);

            foreach (var entity in userQuestionVoteStyles)
            {
                this.questionVoteStylesRepository.Delete(entity);
            }
        }
    }
}
