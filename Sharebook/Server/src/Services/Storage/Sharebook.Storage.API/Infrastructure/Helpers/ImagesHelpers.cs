namespace Stories.Web.Infrastructure
{
    using System.Drawing;
    using System.IO;
    using ImageProcessor;
    using ImageProcessor.Imaging;
    using ImageProcessor.Imaging.Formats;

    public static class ImagesHelpers
    {
        public static byte[] Resize(int width, byte[] originalImage)
        {
            using (var originalImageStream = new MemoryStream(originalImage))
            {
                using (var resultImage = new MemoryStream())
                {
                    using (var imageFactory = new ImageFactory(false))
                    {
                        var createdImage = imageFactory.Load(originalImageStream);

                        if (createdImage.Image.Width > width)
                        {
                            createdImage = createdImage.Resize(new ResizeLayer(new Size(width, 0), resizeMode: ResizeMode.Max));
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
