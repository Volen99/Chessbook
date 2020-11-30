namespace Sharebook.Storage.API.Models.Videos
{
    using System;
    using System.Collections.Generic;
    using System.Drawing;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;

    public class VideoInfo
    {
        public string FilePath { get; set; }

        public TimeSpan Duration { get; set; }

        public TimeSpan Start { get; set; }

        public int Bitrate { get; set; }

        public string VideoCodec { get; set; }

        public Size VideoResolution { get; set; }

        public double VideoFPS { get; set; }

        public string AudioCodec { get; set; }

        public override string ToString()
        {
            string text = string.Format("Filename: {0}, Duration: {1}, Bitrate: {2} kb/s", Path.GetFileName(FilePath), Duration.ToString(@"hh\:mm\:s"), Bitrate);

            if (!string.IsNullOrEmpty(VideoCodec))
            {
                text += string.Format(", Video codec: {0}, Resolution: {1}x{2}, FPS: {3}", VideoCodec, VideoResolution.Width, VideoResolution.Height,
                    VideoFPS.ToString("0.##", CultureInfo.InvariantCulture));
            }

            if (!string.IsNullOrEmpty(AudioCodec))
            {
                text += string.Format(", Audio codec: {0}", AudioCodec);
            }

            return text;
        }
    }
}
