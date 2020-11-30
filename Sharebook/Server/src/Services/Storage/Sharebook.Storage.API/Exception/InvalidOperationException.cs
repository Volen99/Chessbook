namespace Sharebook.Storage.API.Exception
{
    public class InvalidOperationException : ApiException
    {
        public InvalidOperationException(string msg) : base(401, msg)
        {

        }
    }
}