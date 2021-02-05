namespace Sharebook.Web.Models.Inputs
{
    using System;
    using Microsoft.AspNetCore.Mvc;

    [Serializable]
    public class QueryPostParams
    {
        public string Status { get; set; }

        [BindProperty(Name = "auto_populate_reply_metadata")]
        public bool? AutoPopulateReplyMetadata { get; set; }

        [BindProperty(Name = "attachment_url")]
        public string AttachmentUrl { get; set; }

        [BindProperty(Name = "card_uri")]
        public string CardUri { get; set; }

        [BindProperty(Name = "display_coordinates")]
        public string DisplayCoordinates { get; set; }

        [BindProperty(Name = "exclude_reply_user_ids")]
        public int[] ExcludeReplyUserIds { get; set; }

        [BindProperty(Name = "in_reply_to_status_id")]
        public long? InReplyToStatusId { get; set; }

        [BindProperty(Name = "lat")]
        public double Latitude { get; set; }

        [BindProperty(Name = "long")]
        public double Longitude { get; set; }

        [BindProperty(Name = "media_ids")]
        public int[] MediaIds { get; set; }

        [BindProperty(Name = "place_id")]
        public string PlaceId { get; set; }

        [BindProperty(Name = "possibly_sensitive")]
        public bool PossiblySensitive { get; set; }

        /// <summary>
        /// // If set to true, the creator property (IUser) will only contain the id.
        /// </summary>
        [BindProperty(Name = "trim_user")]
        public bool TrimUser { get; set; }      
    }
}
