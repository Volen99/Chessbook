namespace Chessbook.Data.Models.Helpers
{
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Globalization;
    using global::System.Linq;

    public class EnumHelper<TEnum> where TEnum : struct, IConvertible
    {
        public static IEnumerable<TEnum> GetValuesContains(string str)
        {
            return typeof(TEnum).IsEnum
                ? Enum.GetValues(typeof(TEnum))
                    .Cast<TEnum>()
                    .Where(s => s.ToString(CultureInfo.InvariantCulture).ToLower().Contains(str.ToLower()))
                : Enumerable.Empty<TEnum>();
        }
    }
}
