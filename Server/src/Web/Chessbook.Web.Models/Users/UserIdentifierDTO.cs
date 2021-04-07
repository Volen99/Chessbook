namespace Chessbook.Web.Models.Users
{
    public class UserIdentifierDTO
    {
        private int _id;

        public int Id
        {
            get => _id;
            set
            {
                _id = value;
                // this.IdStr = _id.ToString();
            }
        }

       // public string IdStr { get; set; }

        public string ScreenName { get; set; }
    }
}
