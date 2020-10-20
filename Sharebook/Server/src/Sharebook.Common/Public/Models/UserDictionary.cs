namespace Sharebook.Common.Public.Models
{
    using System.Collections.Generic;
    using System.Globalization;

    using Sharebook.Common.Extensions;
    using Sharebook.Common.Public.Models.Interfaces;

    public interface IUserDictionary<T>
    {
        T this[long userId] { get; }
        T this[string username] { get; }
        T this[IUserIdentifier index] { get; }
    }

    public class UserDictionary<T> : IUserDictionary<T>
    {
        private readonly Dictionary<string, T> userIdDictionary;
        private readonly Dictionary<string, T> usernameDictionary;
        private readonly Dictionary<IUserIdentifier, T> userIdentifierDictionary;

        public UserDictionary()
        {
            this.userIdDictionary = new Dictionary<string, T>();
            this.usernameDictionary = new Dictionary<string, T>();
            this.userIdentifierDictionary = new Dictionary<IUserIdentifier, T>();
        }

        public T this[long userId] => this.userIdDictionary[userId.ToString(CultureInfo.InvariantCulture)];

        public T this[string username] => this.usernameDictionary[username];

        public T this[IUserIdentifier index] => this.userIdentifierDictionary[index];

        public void AddOrUpdate(IUserIdentifier user, T element)
        {
            this.userIdentifierDictionary.AddOrUpdate(user, element);

            if (user.Id > 0)
            {
                this.userIdDictionary.AddOrUpdate(user.Id.ToString(CultureInfo.InvariantCulture), element);
            }

            if (!string.IsNullOrEmpty(user.IdStr))
            {
                this.userIdDictionary.AddOrUpdate(user.IdStr, element);
            }

            if (user.ScreenName != null)
            {
                this.usernameDictionary.AddOrUpdate(user.ScreenName, element);
            }
        }
    }
}
