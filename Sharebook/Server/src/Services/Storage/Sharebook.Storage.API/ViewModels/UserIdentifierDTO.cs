namespace Sharebook.Storage.API.ViewModels
{
    public class UserIdentifierDTO
    {
        private long id;

        public long Id
        {
            get => this.id;
            set
            {
                this.id = value;
                IdStr = this.id.ToString();
            }
        }

        public string IdStr { get; set; }

        public string ScreenName { get; set; }
    }
}
