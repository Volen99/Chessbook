namespace Sharebook.Common.Data
{
    using System;
    using System.ComponentModel.DataAnnotations.Schema;
    using Newtonsoft.Json;

    public class Message
    {
        public string serializedData; // // this is a field!!

        private Message() // Allows Entity Framework to do queries
        {
        }

        public Message(object data)
        {
            this.Data = data;
        }

        public int Id { get; private set; }

        public Type Type { get; private set; } // It is configured with model binding in order Entity Framework to save it in the db

        public bool Published { get; private set; }

        public void MarkAsPublished() => this.Published = true;

        [NotMapped]
        public object Data
        {
            get => JsonConvert.DeserializeObject(this.serializedData, this.Type,
                new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });

            set
            {
                this.Type = value.GetType();

                this.serializedData = JsonConvert.SerializeObject(value,
                    new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
            }
        }
    }
}
