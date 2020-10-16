
    // Wrapper classes "cannot" be tested
    export class JObjectStaticWrapper implements IJObjectStaticWrapper
    {
        private readonly _serializer: JsonSerializer;

        constructor()
        {
            this._serializer = new JsonSerializer();

            for (let converter of JsonPropertiesConverterRepository.Converters) {
                this._serializer.Converters.Add(converter);
            }
        }

        public  GetJobjectFromJson(json: string): JObject
        {
            if (!StringExtension.IsMatchingJsonFormat(json))
            {
                return null;
            }

            return JObject.Parse(json);
        }

        public  ToObject<T>(jObject: JObject): T
        {
            return jObject.ToObject<T>(this._serializer);
        }

        public  ToObject<T>(jToken: JToken): T
        {
            if (jToken == null)
            {
                return null;
            }

            return jToken.ToObject<T>(this._serializer);
        }

        public  GetNodeRootName(jToken: JToken): string
        {
            var jProperty = jToken as JProperty;
            return jProperty != null ? jProperty.Name : null;
        }
    }
