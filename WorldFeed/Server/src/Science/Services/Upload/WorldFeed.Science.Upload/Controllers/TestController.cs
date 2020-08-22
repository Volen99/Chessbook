using MassTransit.Mediator;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorldFeed.Science.Upload.Controllers
{

    public class TestController : Controller
    {
        private IMediator mediator;

        public TestController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task<IActionResult> Test()
        {
            var test = new TestObj();
            await this.mediator.Send(test);

            return this.Json("");
        }

        public class TestObj
        {
            public string Name { get; set; }
        }
    }
}
