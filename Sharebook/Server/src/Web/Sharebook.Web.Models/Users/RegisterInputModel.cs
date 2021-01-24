namespace Sharebook.Web.Models.Users
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class RegisterInputModel
    {
        public string DisplayName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public Birthdate Birthdate { get; set; }
    }

    public class Birthdate
    {
        public int Month { get; set; }

        public int Day { get; set; }

        public int Year { get; set; }
    }
}
