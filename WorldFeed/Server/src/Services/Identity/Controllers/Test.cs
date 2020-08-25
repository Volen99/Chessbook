using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorldFeed.Identity.API.Controllers
{
    public class Test
    {
        [JsonProperty("screen_name")]
        public string ScreenName { get; set; }
    }
}
