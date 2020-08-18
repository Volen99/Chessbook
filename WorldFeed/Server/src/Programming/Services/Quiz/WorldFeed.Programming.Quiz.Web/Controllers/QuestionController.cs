using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WorldFeed.Programming.Quiz.Common.Controllers;
using WorldFeed.Programming.Quiz.Data.Models;
using WorldFeed.Programming.Quiz.Services;
using WorldFeed.Programming.Quiz.Web.ViewModels.Questions;

namespace WorldFeed.Programming.Quiz.Web.Controllers
{
    public class QuestionController : ApiController
    {
        private readonly IQuestionService questionService;
        private readonly IUserQuizTokensService userQuizTokensService;
        private readonly UserManager<ApplicationUser> userManager;

        public QuestionController(IQuestionService questionService, IUserQuizTokensService userQuizTokensService, UserManager<ApplicationUser> userManager)
        {
            this.questionService = questionService;
            this.userQuizTokensService = userQuizTokensService;
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<ActionResult<UpdateQuestionResponseModel>> PostUpdateCurrentQuestion(UpdateQuestionInputModel input)
        {
            if (this.ModelState.IsValid == false)
            {
                return this.BadRequest(input);
            }

            var currentQuestion = this.questionService.GetById<QuestionViewModel>(input.QuestionId);
            if (currentQuestion == null)
            {
                return NotFound();
            }

            if (this.User.Identity.IsAuthenticated)
            {
                var userCurrent = await userManager.FindByNameAsync(User.Identity.Name);
                var userQuizTokensCurrent = this.userQuizTokensService.GetById<UserQuizToken>(userCurrent.UserQuizTokenId);

                var isQuestionRepeating = this.userQuizTokensService.IsQuestionRepeating(userQuizTokensCurrent.Id, input.QuestionId);

                if (isQuestionRepeating)
                {
                    await userQuizTokensService.IncreaseHackingAttempts(userQuizTokensCurrent.Id);
                    return new UpdateQuestionResponseModel { RedirectUrl = "https://localhost:5998/Hacker" };  //"https://www.theprogrammingquizs.com/Hacker" };
                }
            }

            var result = await this.questionService.UpdateCurrentQuestion(currentQuestion.Id, input.AnswerValue);


            return new UpdateQuestionResponseModel
            {
                TotalAttempts = result.TotalAttempts,
                AverageScore = result.AverageScore,
                IsQuestionAnsweredCorrectly = currentQuestion.CorrectAnswer == input.AnswerValue,
                CorrectAnswer = currentQuestion.CorrectAnswer,
                RedirectUrl = "",
            };
        }
    }
}