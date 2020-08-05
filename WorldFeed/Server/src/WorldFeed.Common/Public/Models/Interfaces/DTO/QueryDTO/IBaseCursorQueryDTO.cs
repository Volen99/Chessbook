namespace WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO
{
    using System.Collections.Generic;

    public interface IBaseCursorQueryDTO
    {
        long PreviousCursor { get; set; }
        long NextCursor { get; set; }

        string PreviousCursorStr { get; set; }
        string NextCursorStr { get; set; }

        string RawResult { get; set; }

        int GetNumberOfObjectRetrieved();
    }

    public interface IBaseCursorQueryDTO<T> : IBaseCursorQueryDTO
    {
        IEnumerable<T> Results { get; set; }
    }
}
