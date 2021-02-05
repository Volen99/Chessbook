namespace Sharebook.Web.Api.Exceptions
{
    public class ApiException : System.Exception
    {
        private int code;
        public ApiException(int code, string msg) : base(msg)
        {
            this.code = code;
        }
    }
}