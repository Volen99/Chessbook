//namespace WorldFeed.Common.JsonConverters
//{
//    using System.Linq;
//    using Newtonsoft.Json;

//    using WorldFeed.Common.DTO.Cursor;
//    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;

//    public static class JsonQueryConverterRepository
//    {
//        public static JsonConverter[] Converters { get; private set; }

//        static JsonQueryConverterRepository()
//        {
//            Initialize();
//        }

//        private static void Initialize()
//        {
//            var converters = JsonPropertiesConverterRepository.Converters.ToList();
//            converters.AddRange(new JsonConverter[]
//            {
//                new JsonInterfaceToObjectConverter<IIdsCursorQueryResultDTO, IdsCursorQueryResultDTO>(),
//                new JsonInterfaceToObjectConverter<IUserCursorQueryResultDTO, UserCursorQueryResultDTO>(),
//            });

//            Converters = converters.ToArray();
//        }
//    }
//}
