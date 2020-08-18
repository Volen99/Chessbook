using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WorldFeed.Programming.Quiz.Data.Common.Repositories;
using WorldFeed.Programming.Quiz.Data.Models.Styles;
using WorldFeed.Programming.Quiz.Services.Mapping;

namespace WorldFeed.Programming.Quiz.Services.Data.Styles
{
    public class UserPersonalStylesService : IUserPersonalStylesService
    {
        private readonly IRepository<UserPersonalStyles> userPersonalStylesRepository;

        public UserPersonalStylesService(IRepository<UserPersonalStyles> userPersonalStylesRepository)
        {
            this.userPersonalStylesRepository = userPersonalStylesRepository;
        }

        public async Task CreateAsync(string userId)
        {
            var stylesNew = new UserPersonalStyles
            {
                QuestionColor = "",
                QuestionBackgroundColor = "",
                AnswerChoiceColor = "",
                LivesColor = "",
                UserId = userId,
            };

            await this.userPersonalStylesRepository.AddAsync(stylesNew);
            await this.userPersonalStylesRepository.SaveChangesAsync();
        }

        public T GetById<T>(string id)
        {
            var stylesCurrent = this.userPersonalStylesRepository.All()
                .Where(s => s.Id == id)
                .To<T>()
                .FirstOrDefault();

            return stylesCurrent;
        }

        public T GetByUserId<T>(string userId)
        {
            var userStylesCurrent = this.userPersonalStylesRepository.All()
                .Where(s => s.UserId == userId)
                .To<T>()
                .FirstOrDefault();

            return userStylesCurrent;
        }

        public IEnumerable<T> GetAll<T>(int? count = null)
        {
            var userStyles = this.userPersonalStylesRepository.All()
                .To<T>();

            if (count.HasValue)
            {
                userStyles = userStyles.Take(count.Value);
            }

            return userStyles;
        }

        public async Task<T> Edit<T>(string userId, string questionColor, string questionBackground, string answerChoiceColor, string livesColor)
        {
            var userStylesCurrent = this.userPersonalStylesRepository.All()
                .Where(x => x.UserId == userId)
                .FirstOrDefault();

            userStylesCurrent.QuestionColor = questionColor;
            userStylesCurrent.QuestionBackgroundColor = questionBackground;
            userStylesCurrent.AnswerChoiceColor = answerChoiceColor;
            userStylesCurrent.LivesColor = livesColor;
            userStylesCurrent.ChangesCount++;

            await this.userPersonalStylesRepository.SaveChangesAsync();

            return this.userPersonalStylesRepository.All()
                .Where(x => x.UserId == userId)
                .To<T>()
                .FirstOrDefault();
        }

        public void DeleteByUserId(string userId)
        {
            var userPersonalStyles = this.userPersonalStylesRepository.All()
                .Where(x => x.UserId == userId);

            foreach (var entity in userPersonalStyles)
            {
                this.userPersonalStylesRepository.Delete(entity);
            }
        }
    }
}
