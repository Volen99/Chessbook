namespace Sharebook.Upload.ChunkedUpload
{
    using System.Collections.Generic;
    using Sharebook.Upload.API.Web;
    using Sharebook.Upload.DTO;
    using Sharebook.Upload.Models.DTO;

    public interface IChunkUploadResult
    {
        ITwitterResult<IUploadInitModel> Init { get; }

        ITwitterResult[] Appends { get;  }

        ITwitterResult<IUploadedMediaInfo> Finalize { get; }

        IMedia Media { get; }

        bool SuccessfullyUploaded { get; }
    }
    
    public class ChunkUploadResult : IChunkUploadResult
    {
        public ChunkUploadResult()
        {
            this.AppendsList = new List<ITwitterResult>();
        }
        
        public List<ITwitterResult> AppendsList { get; }

        public ITwitterResult<IUploadInitModel> Init { get; set; }

        public ITwitterResult[] Appends => AppendsList.ToArray();

        public ITwitterResult<IUploadedMediaInfo> Finalize { get; set; }

        public bool SuccessfullyUploaded => Finalize?.Response?.IsSuccessStatusCode == true;

        public IMedia Media { get; set; }
    }
}
