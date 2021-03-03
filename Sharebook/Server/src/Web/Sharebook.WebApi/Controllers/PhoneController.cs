﻿namespace Sharebook.Data.Common.Filters
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Sharebook.Data.Models;
    using Sharebook.Services.Data.Services.Contacts;
    using Sharebook.Services.Data.Services.Phone;
    using Sharebook.Web.Api;
    using Sharebook.Web.Api.Controllers;
    using System.Threading.Tasks;

    [Route("phone")]
    public class PhoneController : BaseApiController
    {
        protected readonly IContactService contactService;
        protected readonly IPhoneCallService phoneCallService;
        protected readonly JwtManager jwtManager;

        public PhoneController(IContactService contactService, IPhoneCallService phoneCallService, JwtManager jwtManager)
        {
            this.contactService = contactService;
            this.phoneCallService = phoneCallService;
            this.jwtManager = jwtManager;
        }

        [HttpGet]
        [Route("contacts")]
        public async Task<IActionResult> ContactsAll(string searchText = null, int pageNumber = 1, int pageSize = 10)
        {
            var contacts = await contactService.GetAllContacts(new ContactFilter(searchText, pageNumber, pageSize));
            return Ok(contacts);
        }

        [HttpGet]
        [Route("recent-calls")]
        public async Task<IActionResult> RecentCalls(int pageNumber = 1, int pageSize = 10)
        {
            var calls = await phoneCallService.GetRecentCalls(new BaseFilter(pageNumber, pageSize));
            return Ok(calls);
        }

        [HttpGet]
        [Route("contacts/{contactId:int}/photo")]
        [AllowAnonymous]
        public async Task<IActionResult> ContactPhoto(int contactId, string token)
        {
            var user = jwtManager.GetPrincipal(token);
            if (user == null || !user.Identity.IsAuthenticated)
            {
                return Unauthorized();
            }

            var photoContent = await contactService.GetContactPhoto(contactId);

            if (photoContent == null)
            {
                return NoContent();
            }

            return File(photoContent, contentType: "image/png");
        }
    }
}
