namespace Chessbook.Data.Models.Post.Entities
{
    using Chessbook.Data.Common.Models;

    /// <summary>
    /// A hashtag is a keyword prefixed by # and representing a category of tweet
    /// This class stores information related with an user mention
    /// </summary>
    public class HashtagEntity : BaseDeletableModel<long>
    {
        public string Text { get; set; }

        public int IndicesId { get; set; }
        public Indices Indices { get; set; }

        //public bool Equals(IHashtagEntity other)
        //{
        //    if (other == null || Text != other.Text)
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
        //    return $"#{Text}";
        //}
    }
}
