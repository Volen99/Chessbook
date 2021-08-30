using System.Collections.Generic;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Notifications;

namespace Chessbook.Web.Api.Lib.Shared.Common
{
    public abstract class AbstractNotification<T, U>
      //  where U: UserNotificationSettingModel
    {
        protected readonly T payload;

        public AbstractNotification(T payload)
        {
            this.payload = payload;
        }

        public abstract Task Prepare();
        public abstract void Log();

        public abstract Task<UserNotificationSettingValue> GetSetting(U user);
        public abstract List<U> GetTargetUsers();

        public abstract Task<UserNotification> CreateNotification(U user);
        public abstract void CreateEmail(string to);

        public Task<bool> IsDisabled()
        {
            return Task.FromResult(false);
        }

    }
}
