
    export class AccessRevokedInfo implements IAccessRevokedInfo
    {
        // [JsonProperty("token")]
        public Token: string;

      // [JsonIgnore]
        get ApplicationId(): number {
          return this._accessRevokedClientApplication.Id;
        }

      // [JsonIgnore]
        get ApplicationURL(): string {
          return this._accessRevokedClientApplication.URL;
        }

      // [JsonIgnore]
        get ApplicationConsumerKey(): string {
          return this._accessRevokedClientApplication.ConsumerKey;
        }

        // [JsonIgnore]
        get ApplicationName(): string {
          return this._accessRevokedClientApplication.Name;
        }

        // ReSharper disable once UnassignedField.Compiler
// #pragma warning disable 649
//         [JsonProperty("client_application")]
        private _accessRevokedClientApplication: AccessRevokedClientApplication;
// #pragma warning restore 649

        // ReSharper disable once ClassNeverInstantiated.Local
        private class AccessRevokedClientApplication
        {
            // [JsonProperty("id")]
            public Id: number;

            // [JsonProperty("url")]
            public URL: string

            // [JsonProperty("consumer_key")]
            public ConsumerKey: string

            // [JsonProperty("name")]
            public Name: string
        }
    }
}
