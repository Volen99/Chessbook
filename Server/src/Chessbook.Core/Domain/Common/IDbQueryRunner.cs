namespace Chessbook.Data.Common
{
    using global::System;
    using global::System.Threading.Tasks;

    public interface IDbQueryRunner : IDisposable
    {
        Task RunQueryAsync(string query, params object[] parameters);
    }
}
