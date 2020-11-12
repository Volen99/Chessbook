export interface IJsonClient {
  /// <summary>
  /// Serializes a Twitter object in such a way that it can be deserialized by Tweetinvi
  /// </summary>
  /// <typeparam name="TFrom">Type of the object to serialize</typeparam>
  /// <returns>Json serialized object</returns>
  Serialize<TFrom>(obj: TFrom): string;

  /// <summary>
  /// Serializes a Twitter object in such a way that it can be deserialized by Tweetinvi
  /// </summary>
  /// <typeparam name="TFrom">Type of the object to serialize</typeparam>
  /// <typeparam name="TTo">Type that the object will be serialized</typeparam>
  /// <returns>Json serialized object</returns>
  Serialize<TFrom, TTo>(obj: TFrom): string;

  /// Deserializes json into a dto object
  /// <returns>DTO</returns>
  Deserialize<TTo>(json: string): TTo;
}
