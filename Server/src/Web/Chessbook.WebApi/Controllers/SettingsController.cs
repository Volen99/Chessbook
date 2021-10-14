namespace Chessbook.Web.Api.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using Chessbook.Services.Configuration;
    using Chessbook.Web.Api.Identity;
    using Chessbook.Web.Models;
    using Chessbook.Data.Models;

    [Route("settings")]
    public class SettingsController : BaseApiController
    {
        protected readonly ISettingsService settingsService;
        public SettingsController(ISettingsService settingsService)
        {
            this.settingsService = settingsService;
        }

        [HttpGet]
        [Route("current")]
        public async Task<IActionResult> GetCurrentSetting()
        {
            var currentUserId = User.GetUserId();
            if (currentUserId > 0)
            {
                var result = await settingsService.GetById(currentUserId);
                return Ok(result);
            }

            return Unauthorized();
        }

        [HttpPut]
        [Route("current")]
        public async Task<IActionResult> EditCurrentSetting(SettingsDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.ThemeName))
            {
                return BadRequest();
            }

            var currentUserId = User.GetUserId();
            if (currentUserId > 0)
            {
                var settingCurrent = await this.settingsService.GetById(currentUserId);

                if (settingCurrent == null)
                {
                    settingCurrent = new Settings
                    {
                        CustomerId = currentUserId,
                        ThemeName = dto.ThemeName,
                    };

                    await this.settingsService.CreateAsync(settingCurrent);

                    return Ok(dto);
                }

                settingCurrent.CustomerId = currentUserId;
                settingCurrent.ThemeName = dto.ThemeName;


                var result = await settingsService.Edit(settingCurrent);

                return Ok(dto);
            }

            return Unauthorized();
        }
    }
}