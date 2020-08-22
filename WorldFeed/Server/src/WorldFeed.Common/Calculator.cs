namespace WorldFeed.Common
{
    using System;

    public class Calculator
    {
        public static int? Age(DateTime? date)   // TODO: make it byte?
        {
            if (date.HasValue == false)
            {
                return null;
            }

            var birthDate = date.Value;
            var now = DateTime.Now;

            var age = now.Year - birthDate.Year;
            if (now.Month < birthDate.Month || (now.Month == birthDate.Month && now.Day < birthDate.Day))
            {
                age--;
            }

            return (int)age;
        }
    }
}
