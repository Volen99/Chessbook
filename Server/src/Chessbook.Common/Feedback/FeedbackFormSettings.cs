namespace Chessbook.Common.Feedback
{
    /// <summary> Wraps the properties from the FeedbackFormSettings section in the appsettings.json configuration file </summary>
    public class FeedbackFormSettings
    {
        public string MailServer { get; set; }

        public int MailPort { get; set; }

        public string ChessbookUser { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
    }
}
