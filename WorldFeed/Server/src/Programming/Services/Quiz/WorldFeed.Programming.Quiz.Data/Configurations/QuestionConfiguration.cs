using System;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldFeed.Programming.Quiz.Data.Models;

namespace WorldFeed.Programming.Quiz.Data.Configurations
{
    public class QuestionConfiguration : IEntityTypeConfiguration<Questions>
    {
        public void Configure(EntityTypeBuilder<Questions> builder)
        {
            //throw new NotImplementedException();
        }
    }
}
