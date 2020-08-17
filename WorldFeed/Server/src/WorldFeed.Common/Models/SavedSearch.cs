namespace WorldFeed.Common.Models
{
    using System;

    using global::WorldFeed.Common.Public.Models.Interfaces;
    using global::WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class SavedSearch : ISavedSearch
    {
        private ISavedSearchDTO savedSearchDTO;

        public SavedSearch(ISavedSearchDTO savedSearchDTO)
        {
            this.savedSearchDTO = savedSearchDTO;
        }

        public ISavedSearchDTO SavedSearchDTO
        {
            get => this.savedSearchDTO;
            set => this.savedSearchDTO = value;
        }

        public long Id => this.savedSearchDTO.Id;

        public string IdStr => this.savedSearchDTO.IdStr;

        public string Name
        {
            get => this.savedSearchDTO.Name;
            set => this.savedSearchDTO.Name = value;
        }

        public string Query
        {
            get => this.savedSearchDTO.Query;
            set => this.savedSearchDTO.Query = value;
        }

        public DateTime CreatedAt => this.savedSearchDTO.CreatedAt;
    }
}
