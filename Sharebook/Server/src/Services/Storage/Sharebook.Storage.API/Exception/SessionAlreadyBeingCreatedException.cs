namespace Sharebook.Storage.API.Exception
{
    public class SessionAlreadyBeingCreatedException : ApiException
    {
        public SessionAlreadyBeingCreatedException(string msg) : base(202, msg)
        {

        }
    }
}