using Refit;

using System.Collections.Generic;
using System.Threading.Tasks;

using WorldFeed.Admin.Models.HistoryBCSciencePosts;

namespace WorldFeed.Admin.Services.HistoryBCSciencePosts
{
    public interface IHistoryBCSciencePost
    {
        [Get("/history/BC/science/{name}/photos/{id}")]
        Task<IEnumerable<HistoryBCSciencePostOutputModel>> All();

        [Get("/history/BC/science/{name}{id}")]
        Task<HistoryBCSciencePostOutputModel> Details(string id);
    }
}
