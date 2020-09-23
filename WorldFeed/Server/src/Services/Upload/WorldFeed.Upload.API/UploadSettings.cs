namespace WorldFeed.Upload
{
    /// <summary>
    /// Basically, the application logic is where you implement all use cases that depend on a given front end.
    /// For example, the implementation related to a Web API service
    /// </summary>
    public class UploadSettings
    {
        public string ConnectionString { get; set; }

        public string EventBusConnection { get; set; }

        public bool UseCustomizationData { get; set; }
    }
}
