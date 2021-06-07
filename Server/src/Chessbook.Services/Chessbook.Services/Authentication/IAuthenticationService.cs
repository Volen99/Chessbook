namespace Chessbook.Services.Authentication
{
    using System.Threading.Tasks;
    using Chessbook.Data.Models;
    using Chessbook.Web.Api.Identity;
    using Chessbook.Web.Models.AuthDTO;

    public interface IAuthenticationService
    {
        /// <summary>
        /// Sign in
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="isPersistent">Whether the authentication session is persisted across multiple requests</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task<AuthResult<Token>> Login(Customer customer, bool isPersistent);
        Task<AuthResult<Token>> ChangePassword(ChangePasswordDTO changePasswordDto, int currentUserId);
        Task<AuthResult<Token>> SignUp(SignUpDTO signUpDto);
        Task<AuthResult<string>> RequestPassword(RequestPasswordDTO requestPasswordDto);
        Task<AuthResult<Token>> RestorePassword(RestorePasswordDTO restorePasswordDto);
        Task<AuthResult<Token>> SignOut();
        Task<AuthResult<Token>> RefreshToken(RefreshTokenDTO refreshTokenDto);
        Task<Token> GenerateToken(int userId);

        /// <summary>
        /// Get authenticated customer
        /// </summary>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer
        /// </returns>
        Task<Customer> GetAuthenticatedCustomerAsync();
    }
}
