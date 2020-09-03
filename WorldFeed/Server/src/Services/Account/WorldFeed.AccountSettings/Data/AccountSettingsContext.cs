using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorldFeed.AccountSettings.Models;

namespace WorldFeed.AccountSettings.Data
{
    public class AccountSettingsContext : DbContext
    {
        public AccountSettingsContext(DbContextOptions<AccountSettingsContext> options)
            : base(options)
        {

        }

        public DbSet<Account> Accounts { get; set; }
    }
}
