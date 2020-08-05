namespace WorldFeed.Common.Public.Models.Interfaces
{
    public interface ITwitterIdentifier
    {
        /// <summary>
        /// Id
        /// </summary>
        long Id { get; set; }

        /// <summary>
        /// Id as a string
        /// </summary>
        string IdStr { get; set; }
    }
}
