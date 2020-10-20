namespace Sharebook.Admin.Services.Science
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Refit;

    using Sharebook.Admin.Models.Science;

    public interface IScience
    {
        [Get("/science/{name}/photos/{id}")]
        Task<IEnumerable<ScienceOutputModel>> All();

        [Get("/science/{name}{id}")]
        Task<ScienceOutputModel> Details(string id);
    }
}
