namespace Sharebook.Storage.API.Services
{
    using System.Linq;
    using System.IO;
    using System.Drawing;
    using global::ImageProcessor;
    using global::ImageProcessor.Imaging;
    using global::ImageProcessor.Imaging.Formats;

    public class ImageProcessor : IImageProcessor
    {
        public byte[] Resize(int width, byte[] originalImage, string watermark = null)
        {
            using (var originalImageStream = new MemoryStream(originalImage))
            {
                using (var resultImage = new MemoryStream())
                {
                    using (var imageFactory = new ImageFactory(true))
                    {
                        var createdImage = imageFactory
                            .Load(originalImageStream);

                        createdImage.PreserveExifData = false;

                        if (createdImage.Image.Width > width)
                        {
                            createdImage = createdImage
                                .Resize(new ResizeLayer(new Size(width, 0), resizeMode: ResizeMode.Max));
                        }

                        if (width > 750 || !string.IsNullOrWhiteSpace(watermark))
                        {
                            createdImage = createdImage.Watermark(new TextLayer
                            {
                                Text = string.Format("{0} - {1}", "Mochko.com", watermark).Trim(),
                                DropShadow = true,
                                Position = new Point(100, createdImage.Image.Height - 120),
                                FontColor = Color.White,
                                FontSize = 28
                            });
                        }

                        createdImage = createdImage.Format(new JpegFormat { Quality = 70 });
                        createdImage.Save(resultImage);
                    }

                    return resultImage.GetBuffer();
                }
            }
        }
    }
}
