namespace Chessbook.Common
{
    public static class ChessbookConstants
    {
        public const string SystemName = "Chessbook";

        public const string AdministratorRoleName = "Administrator";

        public const string SiteHttps = "https://localhost:5001";

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
        public static string DefaultAvatarFileName => "default-avatar.jpg";

        /// <summary>
        /// Gets a default image file name
        /// </summary>
        public static string DefaultImageFileName => "default-image.png";
    }
}
