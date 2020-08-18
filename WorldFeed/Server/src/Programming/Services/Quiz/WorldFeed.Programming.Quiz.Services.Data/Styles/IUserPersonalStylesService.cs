using System.Collections.Generic;
using System.Threading.Tasks;

namespace WorldFeed.Programming.Quiz.Services.Data.Styles
{
    public interface IUserPersonalStylesService
    {
        Task CreateAsync(string userId);

        T GetById<T>(string id);

        T GetByUserId<T>(string userId);

        IEnumerable<T> GetAll<T>(int? count = null);

        Task<T> Edit<T>(string userId, string questionColor, string questionBackground, string qnswerChoiceColor, string livesColor);

        void DeleteByUserId(string userId);
    }
}
