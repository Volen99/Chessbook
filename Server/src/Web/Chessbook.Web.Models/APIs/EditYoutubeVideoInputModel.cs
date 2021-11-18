namespace Chessbook.Web.Models.APIs
{
    public class AddYoutubeVideoInputModel
    {
        public string VideoId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }
    }

    public class EditYoutubeVideoInputModel
    {
        public string VideoId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int UserId { get; set; }
    }
    
}
