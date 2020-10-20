namespace Sharebook.Common.JsonConverters
{
    using System.Linq;
    using Newtonsoft.Json;

    using Sharebook.Common.DTO.Cursor;
    using Sharebook.Common.Public.Models.Interfaces.DTO.QueryDTO;

    public static class JsonQueryConverterRepository
    {
        public static JsonConverter[] Converters { get; private set; }

        static JsonQueryConverterRepository()
        {
            Initialize();
        }

        private static void Initialize()
        {
            var converters = JsonPropertiesConverterRepository.Converters.ToList();
            converters.AddRange(new JsonConverter[]
            {
                new JsonInterfaceToObjectConverter<IIdsCursorQueryResultDTO, IdsCursorQueryResultDTO>(),
                new JsonInterfaceToObjectConverter<MessageCursorQueryResultDTO, MessageCursorQueryResultDTO>(),
                new JsonInterfaceToObjectConverter<IUserCursorQueryResultDTO, UserCursorQueryResultDTO>(),
                new JsonInterfaceToObjectConverter<ITwitterListCursorQueryResultDTO, TwitterListCursorQueryResultDTO>(),
            });

            Converters = converters.ToArray();
        }
    }
}
