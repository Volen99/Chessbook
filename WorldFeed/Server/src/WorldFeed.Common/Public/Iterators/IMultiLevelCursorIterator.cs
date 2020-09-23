namespace WorldFeed.Common.Public.Iterators
{
    using System.Threading.Tasks;

    /// <summary>
    /// Twitter API misses some useful endpoints. Tweetinvi created multi level cursors that takes care of handling the complexity for you
    /// Twitter do not provide any endpoint to retrieve a collection of friends. It only supports retrieving friend ids
    /// </summary>
    public interface IMultiLevelCursorIterator<TParent, TItem> : IMultiLevelCursorIterator<TParent, TItem, string>
    {
    }

    /// <summary>
    /// Allow developers to iterate over multiple endpoints transparently.
    /// </summary>
    public interface IMultiLevelCursorIterator<TParent, TItem, TCursor>
    {
        bool Completed { get; }

        Task<IMultiLevelCursorIteratorPage<TParent, TItem, TCursor>> NextPageAsync();
    }
}
