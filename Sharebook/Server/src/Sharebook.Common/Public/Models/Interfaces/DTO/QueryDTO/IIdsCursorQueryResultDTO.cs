namespace Sharebook.Common.Public.Models.Interfaces.DTO.QueryDTO
{
    public interface IIdsCursorQueryResultDTO : IBaseCursorQueryDTO<long>
    {
        long[] Ids { get; set; }
    }
}
