namespace Sharebook.Profile.Application.DTO.QueryDTO.Cursor
{
    using Newtonsoft.Json;
    using Sharebook.Common.DTO.Cursor;
    using Sharebook.Common.Public.Models.Interfaces.DTO;
    using Sharebook.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using Sharebook.Profile.DTO;

    public class UserCursorQueryResultDTO : BaseCursorQueryDTO<IUserDTO>, IUserCursorQueryResultDTO
    {
        private IUserDTO[] _users;

        [JsonProperty("users")]
        public IUserDTO[] Users
        {
            get => _users ?? new IUserDTO[0];
            set
            {
                _users = value;
                Results = value;
            }
        }

        public override int GetNumberOfObjectRetrieved()
        {
            return Users.Length;
        }
    }
}
