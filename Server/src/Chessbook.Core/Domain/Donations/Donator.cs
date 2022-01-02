using System;
using Chessbook.Data.Models;

// 12/26/2021, 18:06 | it's 4 am and i miss your smile and i miss you / a slowed down playlist.
namespace Chessbook.Core.Domain.Donations
{
    public class Donator : BaseEntity
    {
        public string Name { get; set; }

        public string Link { get; set; }

        public string Message { get; set; }

        public string Type { get; set; }  // patron // kofi // lab // pal  - sorry, ai em too lazy to make an enum ;(

        public int Col { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
