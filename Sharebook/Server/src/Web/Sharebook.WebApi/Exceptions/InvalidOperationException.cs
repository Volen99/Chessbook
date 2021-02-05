namespace Sharebook.Web.Api.Exceptions
{
    public class InvalidOperationException : ApiException
    {
        public InvalidOperationException(string msg) : base(401, msg)
        {

        }
    }
}