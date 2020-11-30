namespace Sharebook.Common.Extensions
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Text;

    public static class DateTimeExtensions
    {
        public static int WeekOfYear(this DateTime dateTime)
        {
            return CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(dateTime, CalendarWeekRule.FirstDay, DayOfWeek.Monday);
        }

        public static DateTime UnixToDateTime(long unix)
        {
            long timeInTicks = unix * TimeSpan.TicksPerSecond;
            return new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc).AddTicks(timeInTicks);
        }

        public static long DateTimeToUnix(DateTime dateTime)
        {
            DateTime date = dateTime.ToUniversalTime();
            long ticks = date.Ticks - new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc).Ticks;
            return ticks / TimeSpan.TicksPerSecond;
        }
    }
}
