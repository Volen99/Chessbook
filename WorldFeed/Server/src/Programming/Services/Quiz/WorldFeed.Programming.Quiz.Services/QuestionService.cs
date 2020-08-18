using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

using WorldFeed.Programming.Quiz.Data.Common.Repositories;
using WorldFeed.Programming.Quiz.Data.Models;
using WorldFeed.Programming.Quiz.Services.Mapping;

namespace WorldFeed.Programming.Quiz.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly IRepository<Questions> questionsRepository;
        private readonly IRepository<UserQuizToken> userQuizTokensRepositoy;
        private readonly Random rand;

        public QuestionService(
            IRepository<Questions> questionsRepository,
            IRepository<UserQuizToken> userQuizTokensRepositoy)
        {
            this.questionsRepository = questionsRepository;
            this.userQuizTokensRepositoy = userQuizTokensRepositoy;
            this.rand = new Random();
        }

        public T GetById<T>(int id)
        {
            var questionCurrent = this.questionsRepository.All()
                .Where(i => i.Id == id)
                .To<T>()
                .FirstOrDefault();

            return questionCurrent;
        }

        public IEnumerable<T> GetAll<T>(int? count = null)
        {
            var questions = this.questionsRepository.All();

            if (count.HasValue)
            {
                questions = questions.Take(count.Value);
            }

            return questions.To<T>().ToList();
        }

        public async Task<Questions> UpdateCurrentQuestion(int currentQuestionId, string answerValue)
        {
            var currentQuestion = this.questionsRepository.All()
                .FirstOrDefault(q => q.Id == currentQuestionId);

            currentQuestion.TotalAttempts++;

            var isQuestionAnsweredCorrectly = answerValue == currentQuestion.CorrectAnswer;
            if (isQuestionAnsweredCorrectly)
            {
                currentQuestion.RightAnswers++;
            }
            else
            {
                currentQuestion.WrongAnswers++;
            }

            currentQuestion.AverageScore = (decimal)((currentQuestion.TotalAttempts - currentQuestion.WrongAnswers) * 1.0) / currentQuestion.TotalAttempts * 100; // I wanna kill myself so bad

            await this.questionsRepository.SaveChangesAsync();

            return currentQuestion;
        }

        public async Task<int> RemoveQuestion(int userQuizTokenId, int questionIdCurrent)
        {
            var userQuizTokensCurrent = this.userQuizTokensRepositoy.All()
                .FirstOrDefault(ut => ut.Id == userQuizTokenId);

            var currentUserQuestionsLeft = JsonConvert.DeserializeObject<List<int>>(userQuizTokensCurrent.QuestionsLeft);

            currentUserQuestionsLeft.Remove(questionIdCurrent);

            if (currentUserQuestionsLeft.Any())
            {
                var newQuestionId = currentUserQuestionsLeft[this.rand.Next(0, currentUserQuestionsLeft.Count())];

                userQuizTokensCurrent.CurrentQuestionId = newQuestionId;  
                
                userQuizTokensCurrent.QuestionsLeft = JsonConvert.SerializeObject(currentUserQuestionsLeft);

                await this.questionsRepository.SaveChangesAsync();
            }

            return questionIdCurrent;
        }
    }
}
