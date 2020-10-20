using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json;

using WorldFeed.Programming.Quiz.Common.Controllers;
using WorldFeed.Programming.Quiz.Services.Audios;
using WorldFeed.Programming.Quiz.Web.Models.AnonymousUser;
using WorldFeed.Programming.Quiz.Web.ViewModels.AnonymousUser;
using WorldFeed.Programming.Quiz.Web.ViewModels.Questions;
using WorldFeed.Programming.Quiz.Web.ViewModels.UsersQuizTokens;

namespace WorldFeed.Programming.Quiz.Web.Controllers
{
    public class AnonymousUserController : ApiController
    {
        private const string AUDIO_END_QUIZ = @"/audios/end-quiz.wav";
        private const string AUDIO_TEN_LIVES_ADD = @"/audios/ten-lives-add.wav";

        private readonly IAudioService audioService;

        private readonly Random rand;

        public AnonymousUserController(IAudioService audioService)
        {
            this.audioService = audioService;

            this.rand = new Random();
        }

        [HttpGet(Id)]
        public IActionResult GetRemoveQuestion(int id)
        {
            var anonymousUser = JsonConvert.DeserializeObject<AnonymousUser>(this.HttpContext.Session.GetString(this.HttpContext.Session.Id));
            var questionsLeft = JsonConvert.DeserializeObject<List<int>>(anonymousUser.QuestionsLeft);

            questionsLeft.Remove(id);

            if (questionsLeft.Count >= 1)
            {
                var newQuestionId = questionsLeft[this.rand.Next(0, questionsLeft.Count)];

                anonymousUser.CurrentQuestionId = newQuestionId;

                anonymousUser.QuestionsLeft = JsonConvert.SerializeObject(questionsLeft);

                this.HttpContext.Session.SetString(this.HttpContext.Session.Id, JsonConvert.SerializeObject(anonymousUser));
            }

            return Ok(id);
        }


        [HttpGet("[action]")]
        public ActionResult<UserQuizTokenIncreaseProgessResponseModel> GetIncreaseProgress()
        {
            var anonymousUser = JsonConvert.DeserializeObject<AnonymousUser>(this.HttpContext.Session.GetString(this.HttpContext.Session.Id));

            anonymousUser.QuestionsPassed++;

            if (anonymousUser.QuestionsPassed % 9 == 0)
            {
                anonymousUser.HasUfoPassed = false;
            }

            if (anonymousUser.QuestionsPassed % 24 == 0)
            {
                anonymousUser.IsSnakeUnlocked = true;
                anonymousUser.CanIncreaseLivesFromSnake = true;
            }

            if (anonymousUser.QuestionsPassed == 1000)
            {
                this.audioService.Play(AUDIO_END_QUIZ);
            }
            else if (anonymousUser.Lives > 0  && anonymousUser.QuestionsPassed % 100 == 0)
            {
                this.audioService.Play(AUDIO_TEN_LIVES_ADD);
                anonymousUser.Lives += 10;
            }

            this.HttpContext.Session.SetString(this.HttpContext.Session.Id, JsonConvert.SerializeObject(anonymousUser));

            return new UserQuizTokenIncreaseProgessResponseModel { QuestionsPassed = anonymousUser.QuestionsPassed, Lives = anonymousUser.Lives };
        }

        [HttpGet("[action]")]
        public ActionResult<DecreaseLivesResponseModel> GetDecreaseLives()
        {
            var anonymousUser = JsonConvert.DeserializeObject<AnonymousUser>(this.HttpContext.Session.GetString(this.HttpContext.Session.Id));
            anonymousUser.Lives--;

            this.HttpContext.Session.SetString(this.HttpContext.Session.Id, JsonConvert.SerializeObject(anonymousUser));
            return new DecreaseLivesResponseModel { Lives = anonymousUser.Lives };
        }

        [HttpPost]
        public ActionResult<UserQuizTokenUpdateStreakResponseModel> UpdateStreak(UserQuizTokenUpdateStreakInputModel input)
        {
            var anonymousUser = JsonConvert.DeserializeObject<AnonymousUser>(this.HttpContext.Session.GetString(this.HttpContext.Session.Id));

            if (input.IsQuestionAnsweredCorrectly)
            {
                anonymousUser.CurrentStreak++;

                if (anonymousUser.CurrentStreak > anonymousUser.BestStreak)
                {
                    anonymousUser.BestStreak = anonymousUser.CurrentStreak;
                }
            }
            else
            {
                anonymousUser.CurrentStreak = 0;
            }

            this.HttpContext.Session.SetString(this.HttpContext.Session.Id, JsonConvert.SerializeObject(anonymousUser));

            return new UserQuizTokenUpdateStreakResponseModel { StreakCurrent = anonymousUser.CurrentStreak, StreakBest = anonymousUser.BestStreak };
        }

        [HttpGet(nameof(GetUfoBonusLives))]
        public ActionResult<UserQuizTokenUfoBonusLiveResponseModel> GetUfoBonusLives()
        {
            var anonymousUser = JsonConvert.DeserializeObject<AnonymousUser>(this.HttpContext.Session.GetString(this.HttpContext.Session.Id));

            string message = "OK";
            if (anonymousUser.HasUfoPassed == false)
            {
                anonymousUser.HasUfoPassed = true;
                if (anonymousUser.Lives > 0)
                {
                    anonymousUser.Lives++;
                    this.HttpContext.Session.SetString(this.HttpContext.Session.Id, JsonConvert.SerializeObject(anonymousUser));
                }
            }
            else
            {
                anonymousUser.Lives = 1000; // for savage reasons xD
                message = "Whoaa! Mr. (Ms.) Hacker you are fucking smart! You (almost) got the lives you wanted to pass the quiz! ;) | 13.05.2020, 16:04 PM, Wednesday, BROKEN DREAMS - Beautiful Emotional Music Mix | Ethereal Dramatic Orchestral Music";
            }

            return new UserQuizTokenUfoBonusLiveResponseModel { Lives = anonymousUser.Lives, Message = message };
        }


        [HttpPost(nameof(PostIncreaseSnakeLives))]
        public ActionResult<AnonymousUserIncreaseLivesInputModel> PostIncreaseSnakeLives(AnonymousUserIncreaseLivesInputModel input)
        {
            var anonymousUser = JsonConvert.DeserializeObject<AnonymousUser>(this.HttpContext.Session.GetString(this.HttpContext.Session.Id));

            string message = "OK";
            if (anonymousUser.CanIncreaseLivesFromSnake)
            {
                anonymousUser.IsSnakeUnlocked = false;
                anonymousUser.CanIncreaseLivesFromSnake = false;
                if (input.Lives > 9)
                {
                    input.Lives = 9;
                }
                anonymousUser.Lives += input.Lives;
                this.HttpContext.Session.SetString(this.HttpContext.Session.Id, JsonConvert.SerializeObject(anonymousUser));
            }
            else
            {
              return BadRequest("Not today, bro");
            }

            return new AnonymousUserIncreaseLivesInputModel { Message = message, Lives = anonymousUser.Lives };
        }
    }
}