﻿namespace Sharebook.Data.Models
{
    using Sharebook.Data.Common.Filters;

    public class ContactFilter : BaseFilter
    {
        public ContactFilter(string searchText = null, int pageNumber = 1, int pageSize = 10) : base(pageNumber, pageSize)
        {
            SearchText = searchText;
        }

        public string SearchText { get; set; }
    }
}
