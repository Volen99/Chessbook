namespace Chessbook.Web.Api.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Chessbook.Data.Common.Filters;
    using Chessbook.Services.Data.Services;
    using Chessbook.Services.Data.Services.Entities;
    using Chessbook.Web.Api.Identity;
    using Chessbook.Web.Api.Interfaces;
    using Chessbook.Web.Models;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;
    using Chessbook.Services.Data.Services.Media;
    using Microsoft.AspNetCore.Http;
    using System.IO;
    using Nop.Services.Common;
    using System;
    using System.Linq;
    using Chessbook.Common;
    using Chessbook.Services.Mapping;
    using Chessbook.Web.Models.Inputs;
    using Chessbook.Services.Data;
    using Chessbook.Web.Models.Outputs;
    using Chessbook.Data.Models;
    using Chessbook.Data.Models.Media;
    using Chessbook.Web.Api.Factories;
    using System.Collections.Generic;
    using Chessbook.Core;

    [Route("users")]
    public class UsersController : BaseApiController
    {
        protected readonly IUserService userService;
        protected readonly JwtManager jwtManager;
        protected readonly IAuthenticationService authService;
        protected readonly IPostsService postsService;
        protected readonly IPictureService pictureService;
        private readonly IGenericAttributeService genericAttributeService;
        private readonly IRelationshipService relationshipService;
        private readonly IUserModelFactory userModelFactory;

        public UsersController(IUserService userService, JwtManager jwtManager, IAuthenticationService authService, IPostsService postsService,
            IPictureService pictureService, IGenericAttributeService genericAttributeService, IRelationshipService relationshipService, IUserModelFactory userModelFactory)
        {
            this.userService = userService;
            this.jwtManager = jwtManager;
            this.authService = authService;
            this.postsService = postsService;
            this.pictureService = pictureService;
            this.genericAttributeService = genericAttributeService;
            this.relationshipService = relationshipService;
            this.userModelFactory = userModelFactory;
        }

        [HttpGet]
        [Route("")]
        // [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetDataForGrid([FromQuery] UsersGridFilter filter)
        {
            filter = filter ?? new UsersGridFilter();
            var users = await userService.GetDataForGrid(filter);
            return Ok(users);
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllUsers(int pageNumber = 1, int pageSize = 3)
        {
            var filter = new UsersGridFilter
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
            };

            var users = await this.userService.GetAllUsers(filter, User.GetUserId());

            var usersDTO = users.Item1.MapTo<IList<UserDTO>>();

            for (int i = 0; i < usersDTO.Count; i++)
            {
                usersDTO[i] = await this.userModelFactory.PrepareCustomerModelAsync(usersDTO[i]);
            }

            var tupe = new Tuple<IList<UserDTO>, int>(usersDTO, users.Item2);

            // Thanks https://stackoverflow.com/questions/7397207/json-net-error-self-referencing-loop-detected-for-type ♥
            var res = JsonConvert.SerializeObject(tupe, Formatting.Indented,
               new JsonSerializerSettings
               {
                   PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                   ContractResolver = new CamelCasePropertyNamesContractResolver(),

               });

            return this.Ok(res);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await userService.GetById(id);

            user.StatusesCount = await this.postsService.GetPostsCountByUserId(user.Id);

            return Ok(user);
        }

        [HttpGet]
        [Route("current")]
        public async Task<IActionResult> GetCurrent()
        {
            var currentUserId = User.GetUserId();
            if (currentUserId > 0)
            {
                var model = await userService.GetById(currentUserId);

                model = await this.userModelFactory.PrepareCustomerModelAsync(model);

                return this.Ok(model);
            }

            return Unauthorized();
        }

        [HttpPost]
        [Route("")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> Create(UserDTO userDto)
        {
            if (userDto.Id != 0)
            {
                return BadRequest();
            }

            var result = await userService.Edit(userDto);
            return Ok(result);
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> Edit(int id, UserDTO userDto)
        {
            if (id != userDto.Id)
                return BadRequest();

            var result = await userService.Edit(userDto);
            return Ok(result);
        }

        [HttpPut]
        [Route("current")]
        public async Task<IActionResult> EditCurrent(UserDTO userDto)
        {
            var currentUserId = User.GetUserId();
            if (currentUserId != userDto.Id)
            {
                return BadRequest();
            }
            await userService.Edit(userDto);

            var newToken = await authService.GenerateToken(currentUserId);

            return Ok(newToken);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await userService.Delete(id);
            return Ok(result);
        }

        [HttpGet]
        [Route("{userId:int}/photo")]
        [AllowAnonymous]
        public async Task<IActionResult> UserPhoto(int userId, string token)
        {
            var user = jwtManager.GetPrincipal(token);
            if (user == null || !user.Identity.IsAuthenticated)
            {
                return Unauthorized();
            }

            var photoContent = await userService.GetUserPhoto(userId);

            if (photoContent == null)
            {
                return NoContent();
            }

            return File(photoContent, contentType: "image/png");
        }

        [HttpPost]
        [Route("avatar")]
        public async Task<IActionResult> UploadAvatar()
        {
            //var user = jwtManager.GetPrincipal(token);
            //if (user == null || !user.Identity.IsAuthenticated)
            //{
            //    return Unauthorized();
            //}

            var uploadedFile = this.Request.Form.Files.FirstOrDefault();

            var currentUserId = User.GetUserId();
            var customer = await userService.GetByIdClean(currentUserId);

            if (ModelState.IsValid)
            {
                try
                {
                    if (uploadedFile != null && !string.IsNullOrEmpty(uploadedFile.FileName))
                    {
                        var avatarMaxSize = 1024 * 1024 * 2;
                        if (uploadedFile.Length > avatarMaxSize)
                        {
                            this.BadRequest("throw new NopException(string.Format(await _localizationService.GetResourceAsync('Account.Avatar.MaximumUploadedFileSize'), avatarMaxSize));");
                        }

                        var customerPictureBinary = await this.GetDownloadBitsAsync(uploadedFile);
                        var customerAvatar = await this.pictureService.InsertPictureAsync(customerPictureBinary, uploadedFile.ContentType, null);

                        await this.userService.SaveAvatarId(customer.Id, customerAvatar.Id);

                        var avatarUrl = await this.pictureService.GetPictureUrlAsync(customerAvatar.Id, 400, false);

                        return this.Ok(new { url = ChessbookConstants.SiteHttps + avatarUrl });

                    }


                }
                catch (Exception exc)
                {
                    ModelState.AddModelError("", exc.Message);
                }
            }

            // If we got this far, something failed, redisplay form
            return this.BadRequest();
        }

        /// <summary>
        /// Gets the download binary array
        /// </summary>
        /// <param name="file">File</param>
        /// <returns>Download binary array</returns>
        public virtual async Task<byte[]> GetDownloadBitsAsync(IFormFile file)
        {
            await using var fileStream = file.OpenReadStream();
            await using var ms = new MemoryStream();
            await fileStream.CopyToAsync(ms);
            var fileBytes = ms.ToArray();

            return fileBytes;
        }

        [HttpGet]
        [Route("me/posts/{postId:int}/rating")]
        [Authorize]
        public async Task<IActionResult> GetUserPostRating(int postId)
        {
            var currentUserId = User.GetUserId();
            var postRateDTO = await this.postsService.LoadUserPostRate(currentUserId, postId);

            return this.Ok(postRateDTO);
        }



        [HttpGet]
        [Route("profile/{screenName:length(3,16)}")] // WTF...
        public async Task<IActionResult> GetProfile(string screenName)
        {
            var model = await this.userService.GetByScreenName(screenName);

            model = await this.userModelFactory.PrepareCustomerModelAsync(model);

            return this.Ok(model);
        }

        [HttpPut]
        [Route("personal")]
        public async Task<IActionResult> PostEditPersonalDetails([FromBody] EditPersonalDetailsInputModel input)
        {
            var currentUserId = User.GetUserId();
            var customer = await userService.GetByIdClean(currentUserId);

            if (input.Description != null || input.DisplayName != null)
            {
                customer.Description = input.Description;
                customer.DisplayName = input.DisplayName;

                await this.userService.Update(customer);
            }

            await this.genericAttributeService.SaveAttributeAsync(customer, NopCustomerDefaults.GenderAttribute, input.Gender);

            var dateOfBirth = input.ParseDateOfBirth();
            await this.genericAttributeService.SaveAttributeAsync(customer, NopCustomerDefaults.DateOfBirthAttribute, dateOfBirth);

            var newToken = await authService.GenerateToken(currentUserId);

            return Ok(newToken);
        }

        [HttpGet]
        [Route("birthday/{id:int}")]
        public async Task<IActionResult> GetYourBirthday(int id)
        {
            var currentUserId = User.GetUserId();

            if (currentUserId != id)
            {
                this.Unauthorized("Sorry hacker. Not this time 😎");
            }

            var customer = await userService.GetByIdClean(currentUserId);

            var model = new GetYourBirthdayDTO();

            var dateOfBirth = await this.genericAttributeService.GetAttributeAsync<DateTime?>(customer, NopCustomerDefaults.DateOfBirthAttribute);
            if (dateOfBirth.HasValue)
            {
                model.DateOfBirthMonth = dateOfBirth.Value.Month;
                model.DateOfBirthDay = dateOfBirth.Value.Day;
                model.DateOfBirthYear = dateOfBirth.Value.Year;
            }

            var gender = await this.genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.GenderAttribute);

            model.Gender = gender;

            return this.Ok(model);
        }
    }

   

    public class GetProfileInputQueryModel
    {
        [BindProperty(Name = "screen_name")]
        public string ScreenName { get; set; }
    }
}
