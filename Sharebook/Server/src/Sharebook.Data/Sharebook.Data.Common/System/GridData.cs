namespace Sharebook.Data.Common.System
{
    using global::System.Collections.Generic;

    public class GridData<TDto> where TDto: class, new()
    {
        public int TotalCount { get; set; }
        public IEnumerable<TDto> Items { get; set; }
    }
}
