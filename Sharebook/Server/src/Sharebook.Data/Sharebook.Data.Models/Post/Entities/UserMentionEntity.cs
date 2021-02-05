namespace Sharebook.Data.Models.Post.Entities
{
    using global::System.Collections.Generic;
    using Sharebook.Data.Common.Models;

    /// <summary>
    /// Object storing information related with an user mention on Twitter
    /// </summary>
    public class UserMentionEntity : BaseDeletableModel<long>
    {
        public string IdStr { get; set; }

        public string ScreenName { get; set; }

        public string Name { get; set; }

        public int IndicesId { get; set; }
        public Indices Indices { get; set; }

        //public bool Equals(IUserMentionEntity other)
        //{
        //    if (other == null || !Id.HasValue || !other.Id.HasValue)
        //    {
        //        return false;
        //    }

        //    if (Id.Value != other.Id.Value)
        //    {
        //        return false;
        //    }

        //    if (Indices == null || other.Indices == null)
        //    {
        //        return Equals(Indices, other.Indices);
        //    }

        //    return Indices.ContainsSameObjectsAs(other.Indices, true);
        //}

        //public override string ToString()
        //{
        //    return $"@{ScreenName}";
        //}
    }
}
