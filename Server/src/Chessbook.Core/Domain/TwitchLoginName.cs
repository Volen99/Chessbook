namespace Chessbook.Data.Models
{
    public class TwitchLoginName : BaseEntity
    {
        public string LoginName { get; set; }

        public int UserId { get; set; }
        public Customer User { get; set; }
    }
}
