namespace WorldFeed.Science.Upload.Domain.Models
{
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class SymbolEntity
    {
        public string Text { get; set; }

        public string Indices { get; set; }

    }
}
