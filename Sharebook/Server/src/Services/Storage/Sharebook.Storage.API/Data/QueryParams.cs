namespace Sharebook.Storage.API.Data
{
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using System;
    using System.ComponentModel.DataAnnotations;

    [Serializable]
    public class QueryParams
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
