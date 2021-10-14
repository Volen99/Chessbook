using System.Threading.Tasks;
using Chessbook.Web.Api.Models.Common;

namespace Chessbook.Web.Api.Factories
{
    public interface ICommonModelFactory
    {
        /// <summary>
        /// Prepare the contact us model
        /// </summary>
        /// <param name="model">Contact us model</param>
        /// <param name="excludeProperties">Whether to exclude populating of model properties from the entity</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the contact us model
        /// </returns>
        Task<ContactUsModel> PrepareContactUsModelAsync(ContactUsModel model, bool excludeProperties);
    }
}
