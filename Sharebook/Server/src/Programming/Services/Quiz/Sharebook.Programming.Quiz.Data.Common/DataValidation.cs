using System;
using System.Collections.Generic;
using System.Text;

namespace WorldFeed.Programming.Quiz.Data.Common
{
    public static class DataValidation
    {
        public const int MinName = 3;

        public const string MinNameErrorMessage = "Name cannot be less than 3 symbols";

        public const int MaxName = 30;

        public const string MaxNameErrorMessage = "Name cannont be more than 15 symbols";

        public const int MinDescription = 3;

        public const string MinDescriptionErrorMessage = "Description must be at least 3 symbols";
    }
}
