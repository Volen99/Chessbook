namespace Chessbook.Data
{
    using Microsoft.EntityFrameworkCore;

    public class DataBaseInitializer : IDataBaseInitializer
    {
        private DataContext context;
        public DataBaseInitializer(DataContext context)
        {
            this.context = context;
        }

        public void Initialize()
        {
            using (context)
            {
                // turn off timeout for initial seeding
                context.Database.SetCommandTimeout(System.TimeSpan.FromDays(1));
                // check data base version and migrate / seed if needed
                context.Database.Migrate();
            }
        }
    }
}
