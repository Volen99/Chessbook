namespace Sharebook.Common.Extensions
{
    public static class LongExtensions
    {
        public static string ToMd5HashedString(this long integer)
        {
            var mainIdAsString = integer.ToString();
            return string.Format("{0}{1}", mainIdAsString.ToMd5Hash().Substring(0, 5), integer);
        }
    }
}
