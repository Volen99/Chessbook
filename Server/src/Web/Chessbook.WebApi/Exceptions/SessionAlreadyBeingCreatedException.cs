namespace Chessbook.Web.Api.Exceptions
{
    public class SessionAlreadyBeingCreatedException : ApiException
    {
        public SessionAlreadyBeingCreatedException(string msg) : base(202, msg)
        {

        }
    }
}
