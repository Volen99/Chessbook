namespace Chessbook.Web.Api.Identity
{
    public class AuthResult<T>
    {
        private AuthResult(T token)
        {
            Succeeded = true;
            IsModelValid = true;
            Data = token;
        }

        private AuthResult(bool isSucceeded, bool isModelValid)
        {
            Succeeded = isSucceeded;
            IsModelValid = isModelValid;
        }

        private AuthResult(bool isSucceeded)
        {
            Succeeded = isSucceeded;
            IsModelValid = isSucceeded;
        }

        public bool Succeeded { get; }
        public T Data { get; }
        public bool IsModelValid { get; }

        public static AuthResult<T> UnvalidatedResult => new AuthResult<T>(false);
        public static AuthResult<T> UnauthorizedResult => new AuthResult<T>(false, true);
        public static AuthResult<T> SucceededResult => new AuthResult<T>(true);
        public static AuthResult<T> TokenResult(T data)
        {
            return new AuthResult<T>(data);
        }
    }
}
