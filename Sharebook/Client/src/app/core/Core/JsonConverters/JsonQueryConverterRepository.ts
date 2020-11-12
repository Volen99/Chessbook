export abstract class JsonQueryConverterRepository {
  public static Converters: object[];

  static JsonQueryConverterRepository() {
  }

  private staticInitialize(): void {
    // let converters = JsonPropertiesConverterRepository.Converters.ToList();
    // converters.AddRange(new JsonConverter[]
    // {
    //     new JsonInterfaceToObjectConverter<IIdsCursorQueryResultDTO, IdsCursorQueryResultDTO>(),
    //     new JsonInterfaceToObjectConverter<IMessageCursorQueryResultDTO, MessageCursorQueryResultDTO>(),
    //     new JsonInterfaceToObjectConverter<IUserCursorQueryResultDTO, UserCursorQueryResultDTO>(),
    //     new JsonInterfaceToObjectConverter<ITwitterListCursorQueryResultDTO, TwitterListCursorQueryResultDTO>(),
    // });
    //
    // Converters = converters.ToArray();
  }
}
