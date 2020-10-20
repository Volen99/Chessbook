using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using WorldFeed.Programming.Quiz.Data;
using WorldFeed.Programming.Quiz.Data.Common.Repositories;
using WorldFeed.Programming.Quiz.Data.Models;
using WorldFeed.Programming.Quiz.Data.Models.Timer;
using WorldFeed.Programming.Quiz.Services;
using WorldFeed.Programming.Quiz.Services.Data.Styles;
using WorldFeed.Programming.Quiz.Web.ViewModels.Questions;

namespace WorldFeed.Programming.Quiz.Web.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class RegisterModel : PageModel
    {
        private readonly IQuestionService questionService;
        private readonly IUserQuizTokensService userQuizTokensService;
        private readonly IRepository<QuizTimer> quizTimerRepositoy;
        private readonly IWebHostEnvironment environment;
        private Random rand = new Random();
        private readonly IUserPersonalStylesService userPersonalStylesService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<RegisterModel> _logger;
        private readonly IEmailSender _emailSender;

        public RegisterModel(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<RegisterModel> logger,
            IEmailSender emailSender,
            IQuestionService questionService,
            IUserQuizTokensService userQuizTokensService,
            IRepository<QuizTimer> quizTimerRepositoy,
            IWebHostEnvironment environment,
            IUserPersonalStylesService userPersonalStylesService
            )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _emailSender = emailSender;
            this.questionService = questionService;
            this.userQuizTokensService = userQuizTokensService;
            this.quizTimerRepositoy = quizTimerRepositoy;
            this.environment = environment;
            this.userPersonalStylesService = userPersonalStylesService;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public string ReturnUrl { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public class InputModel
        {
            [Required]
            [Display(Name = "Username")]
            public string UserName { get; set; }

            [Required]
            [EmailAddress]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required]
            [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
            [DataType(DataType.Password)]
            [Display(Name = "Password")]
            public string Password { get; set; }

            [DataType(DataType.Password)]
            [Display(Name = "Confirm password")]
            [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
            public string ConfirmPassword { get; set; }
        }

        public async Task OnGetAsync(string returnUrl = null)
        {
            ReturnUrl = returnUrl;
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl = returnUrl ?? Url.Content("~/");
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            if (ModelState.IsValid)
            {
                var userWithSameUsername = await this._userManager.FindByNameAsync(Input.UserName);

                if (userWithSameUsername != null)
                {
                    TempData["InfoMessage"] = "There is already a user with such username";
                    return Page();
                }

                var randomQuestionId = this.questionService.GetAll<QuestionViewModel>().ToList()[this.rand.Next(0, 999)].Id;

                var indexes = new HashSet<int>();

                for (int questionId = 1; questionId <= 1000; questionId++)
                {
                    indexes.Add(questionId);
                }

                var userQuizToken = new UserQuizToken
                {
                    Lifes = 0,
                    CurrentStreak = 0,
                    BestStreak = 0,
                    MaximumSolved = 0,
                    QuestionsPassed = 0,
                    CreatedOn = DateTime.UtcNow,

                    QuestionsLeft = JsonConvert.SerializeObject(indexes),
                    CurrentQuestionId = randomQuestionId,

                    IsSnakeUnlocked = false,
                    HasUfoPassed = true,
                };

                var user = new ApplicationUser
                {
                    UserName = Input.UserName,
                    Email = Input.Email,
                    UserQuizToken = userQuizToken,
                    UserQuizTokenId = userQuizToken.Id,
                };


                var fileName = Path.GetFileName("default-avatar.png");
                var filePath = Path.Combine(this.environment.WebRootPath + @"/images/users_images", fileName);

                await this.userPersonalStylesService.CreateAsync(user.Id);

                var result = await _userManager.CreateAsync(user, Input.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User created a new account with password.");

                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                    var callbackUrl = Url.Page(
                        "/Account/ConfirmEmail",
                        pageHandler: null,
                        values: new { area = "Identity", userId = user.Id, code = code },
                        protocol: Request.Scheme);

                    await _emailSender.SendEmailAsync(Input.Email, "Confirm your email",
                        $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                    if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    {
                        return RedirectToPage("RegisterConfirmation", new { email = Input.Email });
                    }
                    else
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        return LocalRedirect(returnUrl);
                    }
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            // If we got this far, something failed, redisplay form
            return Page();
        }
    }
}
