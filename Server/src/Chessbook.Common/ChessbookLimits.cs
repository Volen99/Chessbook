namespace Chessbook.Common
{
    public static class ChessbookLimits
    {
        /// <summary>
        /// Max size of an image
        /// </summary>
        public static int UPLOAD_MAX_IMAGE_SIZE = 5 * 1024 * 1024;

        /// <summary>
        /// Max size of a video
        /// </summary>
        public static int UPLOAD_MAX_VIDEO_SIZE = 15 * 1024 * 1024;

        /// <summary>
        /// Max size of an upload chunk
        /// </summary>
        public static int UPLOAD_MAX_CHUNK_SIZE = 4 * 1024 * 1024;
    }
}
