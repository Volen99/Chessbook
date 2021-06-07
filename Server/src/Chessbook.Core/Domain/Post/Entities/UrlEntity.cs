namespace Chessbook.Data.Models.Post.Entities
{
    using Chessbook.Data.Common.Models;

    /// <summary>
    /// Object storing information related with an URL on twitter
    /// </summary>
    public class UrlEntity : BaseDeletableModel<int>
    {
        public string URL { get; set; }

        public string DisplayedURL { get; set; }

        public string ExpandedURL { get; set; }

        public int IndicesId { get; set; }
        public Indices Indices { get; set; }

        //public bool Equals(IUrlEntity other)
        //{
        //    if (other == null)
        //    {
        //        return false;
        //    }

        //    var areUrlDifferent = URL != other.URL ||
        //                          ExpandedURL != other.ExpandedURL ||
        //                          DisplayedURL != other.DisplayedURL;

        //    if (areUrlDifferent)
        //    {
        //        return false;
        //    }

        //    if (Indices == null || other.Indices == null)
        //    {
        //        return Indices == other.Indices;
        //    }

        //    return Indices.ContainsSameObjectsAs(other.Indices, true);
        //}

        //public override string ToString()
        //{
        //    return URL;
        //}
    }
}
