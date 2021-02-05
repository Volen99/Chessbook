namespace Sharebook.Data.Models.Post.Entities
{
    using Sharebook.Data.Common.Models;

    public class SymbolEntity : BaseDeletableModel<long>
    {
        public string Text { get; set; }

        public int IndicesId { get; set; }
        public Indices Indices { get; set; }

        //public bool Equals(ISymbolEntity other)
        //{
        //    if (other == null)
        //    {
        //        return false;
        //    }

        //    if (Text != other.Text)
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
        //    return $"{Text}";
        //}
    }
}
