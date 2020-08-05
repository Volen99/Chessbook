namespace WorldFeed.History.API.Data
{
    public class DataConstants
    {
        public class User
        {
            public const int MinPhoneNumberLength = 5;
            public const int MaxPhoneNumberLength = 20;
            public const string PhoneNumberRegularExpression = @"\+[0-9]*";
        }
    }
}
