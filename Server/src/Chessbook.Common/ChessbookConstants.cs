namespace Chessbook.Common
{
    public static class ChessbookConstants
    {
        public const string SystemName = "Chessbook";

        public const string AdministratorRoleName = "Administrator";

        // public const string SiteHttps = "https://chessbook.me";

        /// <summary>
        /// Gets a multiple thumb directories length
        /// </summary>
        public static int MultipleThumbDirectoriesLength => 3;

        /// <summary>
        /// Gets a path to the image thumbs files
        /// </summary>
        public static string ImageThumbsPath => @"images\thumbs";

        /// <summary>
        /// Gets a default avatar file name
        /// </summary>
        public static string DefaultAvatarFileName => "default-avatar.png";

        /// <summary>
        /// Gets a default image file name
        /// </summary>
        public static string DefaultImageFileName => "default-image.png";

        public static class CONSTRAINTS_FIELDS
        {
            public static class ABUSES
            {
                public static class REASON
                {
                    public static int Min = 2;
                    public static int Max = 3000;
                }

                public static class MODERATION_COMMENT
                {
                    public static int Min = 2;
                    public static int Max = 3000;
                }
            }

            public static class POSTS
            {
                public static class URL
                {
                    public static int Min = 3;
                    public static int Max = 2000;
                }
            }
        }

        public static class USER_FOLLOW_SCORE
        {
            public static int PENALTY = -10;
            public static int BONUS = 10;
            public static int BASE = 1000;
            public static int MAX = 10000;
        }
    }
}
