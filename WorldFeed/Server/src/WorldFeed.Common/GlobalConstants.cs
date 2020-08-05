namespace WorldFeed
{
    public class GlobalConstants
    {
        public const string AdministratorRoleName = "Administrator";

        // TempData dictionary keys
        public const string InfoMessage = "InfoMessage";
        public const string DangerMessage = "DangerMessage";

        // ModelState dictionary keys
        public const string DateTimeError = "DateTimeError";

        // Action names
        public const string Index = "Index";

        // Other
        public const string ExcelMimeType = "application/vnd.ms-excel";
        public const string JsonMimeType = "application/json";
        public const string ZipMimeType = "application/zip";
        public const string BinaryFileMimeType = "application/octet-stream";

        public const string ZipFileExtension = ".zip";
        public const string ExecutableFileExtension = ".exe";

        public const string EmailRegEx = "^[A-Za-z0-9]+[\\._A-Za-z0-9-]+@([A-Za-z0-9]+[-\\.]?[A-Za-z0-9]+)+(\\.[A-Za-z0-9]+[-\\.]?[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

        public const int FileExtentionMaxLength = 4;

        public const int IpAdressMaxLength = 45;

        public const int MinimumSearchTermLength = 3;

        public const int FeedbackContentMinLength = 10;

        public const int DefaultProcessExitTimeOutMilliseconds = 5000; // ms

        // Account
        public const int UserNameMaxLength = 15;
        public const int UserNameMinLength = 5;
        public const string UserNameRegEx = @"^[a-zA-Z]([/._]?[a-zA-Z0-9]+)+$";

        public const int PasswordMinLength = 6;
        public const int PasswordMaxLength = 100;

        public const int EmailMaxLength = 80;

        public const int FirstNameMaxLength = 30;
        public const int LastNameMaxLength = 30;
        public const int CityNameMaxLength = 30;
        public const int EducationalInstitutionMaxLength = 50;
        public const int FacultyNumberMaxLength = 30;
        public const int CompanyNameMaxLength = 30;
        public const int JobTitleMaxLenth = 30;
    }
}
