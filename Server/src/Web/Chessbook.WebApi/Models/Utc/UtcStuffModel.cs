using System.Collections.Generic;
using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.Utc
{
    public record UtcStuffModel : BaseNopEntityModel
    {
        public List<CountryUtcModel> Countries { get; set; }

        public List<TimeZoneUtcModel> TimeZones { get; set; }
    }

    public class CountryUtcModel : ISelectListItem
    {
        public string Value { get; set; }

        public string Text { get; set; }
    }

    public class TimeZoneUtcModel : ISelectListItem
    {
        public string Value { get; set; }

        public string Text { get; set; }
    }

    public interface ISelectListItem
    {
        public string Value { get; set; }

        public string Text { get; set; }
    }
}
