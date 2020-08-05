namespace WorldFeed.Common.Json
{
    using System;

    public interface IJsonConverter
    {
        object GetObjectToSerialize(object source);

        object Deserialize(string json);
    }

    public class JsonTypeConverter<T1, T2> : IJsonConverter
        where T1 : class
        where T2 : class
    {
        private readonly Func<T1, T2> getDto;
        private readonly Func<string, T1> deserializer;

        public JsonTypeConverter(Func<T1, T2> getDto, Func<string, T1> deserializer)
        {
            this.getDto = getDto;
            this.deserializer = deserializer;
        }

        public object GetObjectToSerialize(object source)
        {
            return this.getDto(source as T1);
        }

        public object Deserialize(string json)
        {
            return this.deserializer(json);
        }
    }
}
