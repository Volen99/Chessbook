namespace WorldFeed.Programming.Quiz.Services.Data
{
    using System.Threading.Tasks;

    public interface IVotesService<TEntity>
    {
        Task VoteAsync(int entitiyId, string userId, bool isUpVote);

        int GetVotes(int entitiyId);
    }
}
