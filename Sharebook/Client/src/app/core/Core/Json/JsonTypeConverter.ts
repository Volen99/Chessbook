export interface IJsonConverter {
  getObjectToSerialize(source: object): object;

  deserialize(json: string): object;
}

export class JsonTypeConverter<T1, T2> implements IJsonConverter {
  deserialize(json: string): object {
    return undefined;
  }

  getObjectToSerialize(source: object): object {
    return undefined;
  }
}

// public class  JsonTypeConverter<T1, T2> : IJsonConverter
//     where T1 : class
//     where T2 : class
// {
//     private readonly Func<T1, T2> _getDto;
//     private readonly Func<string, T1> _deserializer;
//
//     public JsonTypeConverter(Func<T1, T2> getDto, Func<string, T1> deserializer)
//     {
//         _getDto = getDto;
//         _deserializer = deserializer;
//     }
//
//     public object GetObjectToSerialize(object source)
//     {
//         return _getDto(source as T1);
//     }
//
//     public object Deserialize(string json)
//     {
//         return _deserializer(json);
//     }
// }
