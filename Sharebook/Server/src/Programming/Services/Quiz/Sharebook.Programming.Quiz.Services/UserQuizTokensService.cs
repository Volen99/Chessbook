using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;

using WorldFeed.Programming.Quiz.Data.Common.Repositories;
using WorldFeed.Programming.Quiz.Data.Models;
using WorldFeed.Programming.Quiz.Data.Models.Timer;
using WorldFeed.Programming.Quiz.Services.Audios;
using WorldFeed.Programming.Quiz.Services.Mapping;
using WorldFeed.Programming.Quiz.Web.ViewModels.Questions;

namespace WorldFeed.Programming.Quiz.Services
{
    public class UserQuizTokensService : IUserQuizTokensService
    {
        private const string AUDIO_END_QUIZ = @"/audios/end-quiz.wav";
        private const string AUDIO_TEN_LIVES_ADD = @"/audios/ten-lives-add.wav";

        private readonly IDeletableEntityRepository<UserQuizToken> userQuizTokensRepository;
        private readonly IQuestionService questionService;
        private readonly IRepository<QuizTimer> quizTimerRepositroy;
        private readonly IAudioService audioService;

        private readonly Random rand;

        public UserQuizTokensService(
            IDeletableEntityRepository<UserQuizToken> userQuizTokensRepository,
            IQuestionService questionService,
            IRepository<QuizTimer> quizTimerRepositroy,
            IAudioService audioService)
        {
            this.userQuizTokensRepository = userQuizTokensRepository;
            this.questionService = questionService;
            this.quizTimerRepositroy = quizTimerRepositroy;
            this.audioService = audioService;

            this.rand = new Random();
        }

        public T GetById<T>(int userQuizTokensId)
        {
            var userTokensCurrent = this.userQuizTokensRepository.All()
                .Where(uc => uc.Id == userQuizTokensId)
                .To<T>()
                .FirstOrDefault();

            return userTokensCurrent;
        }

        public IEnumerable<T> GetAll<T>(int? count = null)
        {
            var userTokens = this.userQuizTokensRepository.All();

            if (count.HasValue)
            {
                userTokens.Take(count.Value);
            }

            return userTokens.To<T>().ToList();
        }

        public async Task SetInitialUserQuizTokens(int userQuizTokensId, int lives)
        {
            var userTokensCurrent = this.userQuizTokensRepository.All()
                .Where(ut => ut.Id == userQuizTokensId)
                .FirstOrDefault();

            QuizTimer quizTimerCurrent = null;

            var indexes = new HashSet<int>();
            for (int questionId = 1; questionId <= 1000; questionId++)
            {
                indexes.Add(questionId);
            }
            
            userTokensCurrent.QuestionsLeft = JsonConvert.SerializeObject(indexes);

            var randomQuestionId = this.questionService.GetAll<QuestionViewModel>().ToList()[this.rand.Next(0, 999)].Id;
            userTokensCurrent.CurrentQuestionId = randomQuestionId;

            userTokensCurrent.Lifes = lives;
            userTokensCurrent.CurrentStreak = 0;
            userTokensCurrent.QuestionsPassed = 0;
            userTokensCurrent.IsSnakeUnlocked = false;
            userTokensCurrent.HasUfoPassed = true;

            quizTimerCurrent = this.quizTimerRepositroy.All()
                .FirstOrDefault(qt => qt.UserQuizTokenId == userQuizTokensId);

            quizTimerCurrent.Days = 0;
            quizTimerCurrent.Hours = 0;
            quizTimerCurrent.Minutes = 0;
            quizTimerCurrent.Seconds = 0;

            await this.userQuizTokensRepository.SaveChangesAsync();
            await this.quizTimerRepositroy.SaveChangesAsync();
        }

        public async Task<UserQuizToken> UpdateStreak(int userQuizTokensId, bool isQuestionAnsweredCorrectly)
        {
            var userTokensCurrent = this.userQuizTokensRepository.All().
                Where(ut => ut.Id == userQuizTokensId)
                .FirstOrDefault();

            if (userTokensCurrent != null)
            {
                if (isQuestionAnsweredCorrectly)
                {
                    userTokensCurrent.CurrentStreak++;

                    if (userTokensCurrent.CurrentStreak > userTokensCurrent.BestStreak)
                    {
                        userTokensCurrent.BestStreak = userTokensCurrent.CurrentStreak;
                    }
                }
                else
                {
                    userTokensCurrent.CurrentStreak = 0;
                }

                await this.userQuizTokensRepository.SaveChangesAsync();
            }

            return userTokensCurrent;
        }

        public async Task<UserQuizToken> UpdateBonusUfoLives(int userQuizTokensId, int lives)
        {
            var userTokens = this.userQuizTokensRepository.All()
                .FirstOrDefault(ut => ut.Id == userQuizTokensId);

            if (userTokens.HasUfoPassed == false)
            {
                userTokens.HasUfoPassed = true;
                if (userTokens.Lifes <= 0)
                {
                    lives = 0;
                }

                userTokens.Lifes += lives;
                await this.userQuizTokensRepository.SaveChangesAsync();
            }
            else
            {
                await this.IncreaseHackingAttempts(userQuizTokensId);
                userTokens.Lifes = 1000; // for savage reasons xD
            }

            return userTokens;
        }

        public async Task<UserQuizToken> IncreaseProgress(int userQuizTokensId)
        {
            var userTokensCurrent = this.userQuizTokensRepository.All().
                Where(ut => ut.Id == userQuizTokensId)
                .FirstOrDefault();

            userTokensCurrent.QuestionsPassed++;

            if (userTokensCurrent.QuestionsPassed % 9 == 0)
            {
                userTokensCurrent.HasUfoPassed = false;
            }

            if (userTokensCurrent.QuestionsPassed % 24 == 0)
            {
                userTokensCurrent.IsSnakeUnlocked = true;
                userTokensCurrent.CanIncreaseLivesFromSnake = true;
            }

            if (userTokensCurrent.QuestionsPassed > userTokensCurrent.MaximumSolved)
            {
                userTokensCurrent.MaximumSolved = userTokensCurrent.QuestionsPassed;
            }

            if (userTokensCurrent.QuestionsPassed == 1000)
            {
                this.audioService.Play(AUDIO_END_QUIZ);
            }
            else if (userTokensCurrent.Lifes > 0 && userTokensCurrent.QuestionsPassed > 0 && userTokensCurrent.QuestionsPassed % 100 == 0)
            {
                this.audioService.Play(AUDIO_TEN_LIVES_ADD);
                userTokensCurrent.Lifes += 10;
            }

            await this.userQuizTokensRepository.SaveChangesAsync();

            return userTokensCurrent;
        }

        public async Task<int> IncreaseSnakeLives(int userQuizTokensId, int lives)
        {
            var userTokens = this.userQuizTokensRepository.All()
                 .FirstOrDefault(i => i.Id == userQuizTokensId);

            if (userTokens.CanIncreaseLivesFromSnake == false)
            {
                userTokens.HackingAttempts++;
                await this.userQuizTokensRepository.SaveChangesAsync();

                return -1;
            }

            userTokens.IsSnakeUnlocked = false;
            userTokens.CanIncreaseLivesFromSnake = false;

            if (lives > 9)
            {
                lives = 9;
            }

            userTokens.Lifes += lives;
            await this.userQuizTokensRepository.SaveChangesAsync();

            return userTokens.Lifes;
        }

        public async Task<int> DecreaseLives(int userQuizTokensId)
        {
            var userTokensCurrent = this.userQuizTokensRepository.All()
                .Where(ut => ut.Id == userQuizTokensId)
                .FirstOrDefault();

            userTokensCurrent.Lifes--;
            await this.userQuizTokensRepository.SaveChangesAsync();

            return userTokensCurrent.Lifes;
        }

        public async Task SetSnakeStatus(int userQuizTokensId, bool status)
        {
            var userTokens = this.userQuizTokensRepository.All()
               .FirstOrDefault(i => i.Id == userQuizTokensId);

            userTokens.IsSnakeUnlocked = status;
            await this.userQuizTokensRepository.SaveChangesAsync();
        }

        public bool IsQuestionRepeating(int userQuizTokensId, int currentQuestionId)
        {
            var userQuizTokensCurrent = this.userQuizTokensRepository.All()
                     .FirstOrDefault(ut => ut.Id == userQuizTokensId);

            var currentUserQuestionsLeft = JsonConvert.DeserializeObject<List<int>>(userQuizTokensCurrent.QuestionsLeft);

            var result = false;
            if (currentUserQuestionsLeft.Contains(currentQuestionId) == false)
            {
                result = true;
            }

            return result;
        }

        public async Task IncreaseHackingAttempts(int userQuizTokensId)
        {
            var userTokens = this.userQuizTokensRepository.All()
                 .FirstOrDefault(i => i.Id == userQuizTokensId);

            userTokens.HackingAttempts++;

            await this.userQuizTokensRepository.SaveChangesAsync();
        }
    }
}
