namespace WebStatus.Controllers
{
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;

    public class HomeController : Controller
    {
        private IConfiguration configuration;

        public HomeController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public IActionResult Index()
        {
            var basePath = this.configuration["PATH_BASE"];
            return Redirect($"{basePath}/hc-ui");
        }

        [HttpGet("/Config")]
        public IActionResult Config()
        {
            var configurationValues = this.configuration.GetSection("HealthChecksUI:HealthChecks")
                .GetChildren()
                .SelectMany(cs => cs.GetChildren())
                .Union(this.configuration.GetSection("HealthChecks-UI:HealthChecks")
                .GetChildren()
                .SelectMany(cs => cs.GetChildren()))
                .ToDictionary(v => v.Path, v => v.Value);

            return View(configurationValues);
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
