namespace Chessbook.Web.Api.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using Chessbook.Web.Api.Interfaces;
    using Chessbook.Web.Models.AuthDTO;

    [Route("users/{id:int}/roles")]
    [Authorize(Policy = "AdminOnly")]
    public class RolesController : BaseApiController
    {
        protected readonly IRoleService roleService;

        public RolesController(IRoleService roleService)
        {
            this.roleService = roleService;
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> Assign(int id, RoleDTO role)
        {
            var result = await roleService.AssignToRole(id, role.Name);
            if (result.Succeeded)
                return Ok();

            return BadRequest(new { message = result.Errors.FirstOrDefault()?.Description });
        }

        [HttpDelete]
        [Route("")]
        public async Task<IActionResult> Unassign(int id, RoleDTO role)
        {
            var result = await roleService.UnassignRole(id, role.Name);
            if (result.Succeeded)
                return Ok();

            return BadRequest(new { message = result.Errors.FirstOrDefault()?.Description });
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetRoles(int id)
        {
            var result = await roleService.GetRoles(id);
            return Ok(result);
        }
    }
}
