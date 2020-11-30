namespace Sharebook.Storage.API.Services
{
    public interface IImageProcessor
    {
        byte[] Resize(int width, byte[] originalImage, string watermark = null);
    }
}
