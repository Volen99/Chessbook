namespace WorldFeed.Common.Public.Parameters.Optionals
{
    using WorldFeed.Common.Public.Parameters;

    /// <inheritdoc />
    public interface IGetCursorUsersOptionalParameters : ICursorQueryParameters, IGetUsersOptionalParameters
    {
    }
    
    /// <inheritdoc />
    public class GetCursorUsersOptionalParameters : CursorQueryParameters, IGetUsersOptionalParameters
    {
        public GetCursorUsersOptionalParameters()
        {
        }

        public GetCursorUsersOptionalParameters(IGetCursorUsersOptionalParameters parameters)
            : base(parameters)
        {
            IncludeEntities = parameters?.IncludeEntities;
            SkipStatus = parameters?.SkipStatus;
        }        
        
        /// <inheritdoc />
        public bool? IncludeEntities { get; set; }
        /// <inheritdoc />
        public bool? SkipStatus { get; set; }
    }
}
