namespace Sharebook.Data.Models.Post.Entities
{
    public class UserEntities
    {
        //[JsonProperty("url")]
        public WebsiteEntity Website { get; set; }

        public DescriptionEntity Description { get; set; }
    }
}
