namespace WorldFeed.Common.Upload
{
    using System.Collections.Generic;

    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Web;

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
            AppendsList = new List<ITwitterResult>();
        }
        
        public List<ITwitterResult> AppendsList { get; }

        public ITwitterResult<IUploadInitModel> Init { get; set; }

        public ITwitterResult[] Appends => AppendsList.ToArray();

        public ITwitterResult<IUploadedMediaInfo> Finalize { get; set; }

        public bool SuccessfullyUploaded => Finalize?.Response?.IsSuccessStatusCode == true;

        public IMedia Media { get; set; }
    }
}
