using System;
using Chessbook.Data.Models;

namespace Chessbook.Core.Domain.Customers
{
    public class UserBlocklist : BaseEntity
    {
        public int UserId { get; set; }
        public Customer ByUser { get; set; } // onDelete: 'CASCADE'

        public int TargetUserId { get; set; }
        public Customer BlockedUser { get; set; } //  onDelete: 'CASCADE'

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
