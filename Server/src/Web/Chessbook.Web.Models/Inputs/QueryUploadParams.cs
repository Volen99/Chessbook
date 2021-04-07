namespace Chessbook.Web.Models.Inputs
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using Microsoft.AspNetCore.Mvc;

    [Serializable]
    public class QueryUploadParams
    {
        [Required]
        public string Command { get; set; }

        [BindProperty(Name = "total_bytes")]
        public long? TotalBytes { get; set; }

        [BindProperty(Name = "media_id")]
        public long? MediaId { get; set; }

        [BindProperty(Name = "media_category")]
        public string MediaCategory { get; set; }

        [BindProperty(Name = "media_type")]
        public string MediaType { get; set; }

        [BindProperty(Name = "segment_index")]
        public int? SegmentIndex { get; set; }
    }
}
