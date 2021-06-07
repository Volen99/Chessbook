namespace Chessbook.Services.Data.Services.Phone
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Chessbook.Data.Common.Filters;
    using Chessbook.Web.Models.Phone;

    public interface IPhoneCallService
    {
        Task<IEnumerable<PhoneCallDTO>> GetRecentCalls(BaseFilter filter);
    }
}
