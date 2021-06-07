namespace Chessbook.Data.Common.Filters
{
    public class BaseFilter
    {
        public BaseFilter(int pageNumber = 1, int pageSize = 10)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
        }

        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortBy { get; set; }
        public string OrderBy { get; set; }
    }
}
