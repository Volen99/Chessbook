namespace Sharebook.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public static class SeedData
    {
        public static string Initial(string schema)
        {
            var rnd = new Random();
            DateTime RandomDate(DateTime? start = null)
            {
                if (start == null)
                    start = new DateTime(2018, 10, 1);

                var range = (DateTime.Now - start).Value.Days;
                return start.Value.AddDays(rnd.Next(range));
            }

            string RandomDateTimeString()
            {
                return RandomDate().AddSeconds(rnd.Next(86400)).ToString("yyyy-MM-dd hh:mm:ss");
            }

            string RandomDateString(DateTime? startDate = null, DateTime? endDate = null)
            {
                if (startDate == null)
                    startDate = new DateTime(2010, 1, 1);

                if (endDate == null)
                    endDate = DateTime.Today;

                var range = (endDate - startDate).Value.Days;
                var date = startDate.Value.AddDays(rnd.Next(range));
                return date.ToString("yyyy-MM-dd hh:mm:ss");
            }

            var currentDate = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss");
            var sqlCommand = new StringBuilder();


            // Roles
            sqlCommand.Append($"INSERT INTO [{schema}].[Roles] ([Name]) VALUES ('admin'), ('user')");
            sqlCommand.AppendLine();

            return sqlCommand.ToString();
        }

        private static IEnumerable<(string, string)> GetContactNames()
        {
            return new List<(string, string)> {
                ("Nick", "Jones"),
                ("Eva", "Moor"),
                ("Jack", "Williams"),
                ("Lee", "Wong"),
                ("Alan", "Thompson"),
                ("Kate", "Martinez")
            };
        }

        private static IEnumerable<string> GetNamesList(int count = 30)
        {
            return new List<string> {
                "Rostand Simon", "Petulia Samuel", "Bacon Mathghamhain", "Adlei Michael", "Damian IvorJohn", "Fredenburg Neil", "Strader O''Neal", "Meill Donnell", "Crowell O''Donnell",
               "Lenssen Rory", "Jac Names", "Budge Mahoney", "Bondy Simon", "Bilow Ahearn", "Weintrob Farrell", "Tristan Cathasach", "Baxy Bradach", "Utta Damhan", "Brag Treasach",
               "Vallie Kelly", "Trutko Aodha", "Mellins Cennetig", "Zurek Casey", "Star O''Neal", "Hoffer Names", "Sturges Macshuibhne", "Lifton Sioda", "Rochell Ahearn", "Lynsey Mcmahon",
               "Delp Seaghdha", "Sproul O''Brien", "Omar Ahearn", "Keriann Bhrighde", "Killoran Sullivan", "Olette Riagain", "Kohn Gorman", "Shimberg Maurice", "Nalda Aodh",
               "Livvie Casey", "Zoie Treasach", "Kletter Daly", "Sandy Mckay", "Ern O''Neal", "Loats Maciomhair", "Marlena Mulryan", "Hoshi Naoimhin", "Schmitt Whalen",
               "Patterson Raghailligh", "Ardeen Kelly", "Rasla Simon", "Douty Cennetig", "Giguere Names", "Dorina Clark", "Rothmuller Simon", "Shabbir Delaney", "Placidia Bradach",
               "Savior Keefe", "Concettina Maguire", "Malynda Muirchertach", "Vanzant Fearghal", "Schroder Ruaidh", "Ainslie Ciardha", "Richter Colman", "Gianni Macghabhann",
               "Norvan O''Boyle", "Polak Mcneil", "Bridges Macghabhann", "Eisenberg Samuel", "Thenna Daly", "Moina Mcmahon", "Gasper Whelan", "Hutt O''Keefe", "Quintin Names",
               "Towny Reynold", "Viviane Ceallachan", "Girovard Power", "Fanchon Flann", "Nickolai Meadhra", "Polash Login", "Cacilia Macghabhann", "Chaffee Rory", "Baseler Conchobhar",
               "Amathiste Cuidightheach", "Ishii Riagain", "Marieann Damhan", "Rangel Dubhain", "Alarick Fionn", "Humfrey Rory", "Mable O''Mooney", "Jemie Macdermott", "Hogen Rhys",
               "Cazzie Mohan", "Airlie Reynold", "Safire O''Hannigain", "Strephonn Nuallan", "Brion Eoghan", "Banquer Seaghdha", "Sedgewinn Mcguire", "Alma Macghabhann", "Durward Mcnab" }.Take(count);
        }
    }
}
