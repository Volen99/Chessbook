namespace Chessbook.Web.Api.Interfaces
{
    using System.Threading.Tasks;

    using Chessbook.Web.Api.Identity;
    using Chessbook.Web.Models.AuthDTO;

    public interface IAuthenticationService
    {
        Task<AuthResult<Token>> Login(LoginDTO loginDto);
        Task<AuthResult<Token>> ChangePassword(ChangePasswordDTO changePasswordDto, int currentUserId);
        Task<AuthResult<Token>> SignUp(SignUpDTO signUpDto);
        Task<AuthResult<string>> RequestPassword(RequestPasswordDTO requestPasswordDto);
        Task<AuthResult<Token>> RestorePassword(RestorePasswordDTO restorePasswordDto);
        Task<AuthResult<Token>> SignOut();
        Task<AuthResult<Token>> RefreshToken(RefreshTokenDTO refreshTokenDto);
        Task<Token> GenerateToken(int userId);
    }
}
