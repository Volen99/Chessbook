using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace Chessbook.Common
{
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Usage", "CA2211:Non-constant fields should not be visible", Justification = "By design")]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.MaintainabilityRules", "SA1401:Fields should be private", Justification = "By design")]
    public static class JsonSettings
    {
        public static JsonSerializer DescriptionSerializer = new JsonSerializer
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
        };

        public static JsonSerializerSettings CamelCaseNaming = new JsonSerializerSettings
        {
            ContractResolver = new DefaultContractResolver()
            {
                NamingStrategy = new CamelCaseNamingStrategy(),
            },
        };

        public static JsonSerializerSettings GlobalJsonSettings = new JsonSerializerSettings()
        {
            DateParseHandling = DateParseHandling.None,
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
        };

        public static JsonSerializerSettings CamelCaseReferenceLoopIgnore = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
        };

        public static JsonSerializerSettings NullValueIgnore = new JsonSerializerSettings
        {
            NullValueHandling = NullValueHandling.Ignore,
        };

        public static JsonSerializerSettings ObjectReplaceProperties = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ObjectCreationHandling = ObjectCreationHandling.Replace,
        };

        public static JsonSerializerSettings SaveProperties = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ObjectCreationHandling = ObjectCreationHandling.Replace,
            NullValueHandling = NullValueHandling.Ignore,
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            Converters = new List<JsonConverter>
            {
                new StringEnumConverter(),
            },
        };

        public static JsonSerializerSettings FrontendOptionsProperties = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            NullValueHandling = NullValueHandling.Ignore,
        };
    }
}
