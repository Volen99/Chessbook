namespace Sharebook.Upload.Application.Parameters
{
    public interface IUploadParameters : IUploadOptionalParameters
    {
        /// <summary>
        /// Binary that you want to publish 
        /// </summary>
        byte[] Binary { get; set; }
    }

    public class UploadBinaryParameters : UploadOptionalParameters, IUploadParameters
    {
        public UploadBinaryParameters(byte[] binary)
        {
            this.Binary = binary;
        }

        public byte[] Binary { get; set; }
    }
}
    