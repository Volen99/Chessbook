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
        Task<AuthResult<Token>> SignInAsync(Customer customer, bool isPersistent);

        /// <summary>
        /// Sign out
        /// </summary>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task SignOutAsync();

        /// <summary>
        /// Get authenticated customer
        /// </summary>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer
        /// </returns>
        Task<Customer> GetAuthenticatedCustomerAsync();

        Task<AuthResult<Token>> RefreshToken(RefreshTokenDTO refreshTokenDto);

        Task<Token> GenerateToken(int userId);
    }
}
