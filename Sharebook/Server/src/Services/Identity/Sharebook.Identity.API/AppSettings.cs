namespace Sharebook.Identity.API
{
    public class AppSettings
    {
        public string MvcClient { get; set; }

        public bool UseCustomizationData { get; set; }

        public string Secret { get; private set; }
    }
}
