namespace Chessbook.Web.Api.Exceptions
{
    public class NotFoundException : ApiException
    {
        public NotFoundException(string msg) : base(404, msg)
        {
        }
    }
}