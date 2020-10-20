namespace Sharebook.Common.Public.Parameters
{
    /// <summary>
    /// A query that can return multiple times based on a cursor value
    /// </summary>
    public interface ICursorQueryParameters : ICustomRequestParameters
    {
        /// <summary>
        /// Defines the cursor that will be used for executing the first request
        /// </summary>
        string Cursor { get; set; }

        /// <summary>
        /// Defines the maximum number of items that will be returned per request
        /// </summary>
        int PageSize { get; set; }
    }

    public class CursorQueryParameters : CustomRequestParameters, ICursorQueryParameters
    {
        public CursorQueryParameters()
        {
            Cursor = null;
            PageSize = 20;
        }

        public CursorQueryParameters(ICursorQueryParameters parameters) : base(parameters)
        {
            if (parameters == null)
            {
                return; 
            }

            this.Cursor = parameters.Cursor;
            this.PageSize = parameters.PageSize;
        }

        /// <inheritdoc/>
        public string Cursor { get; set; }

        /// <inheritdoc/>
        public int PageSize { get; set; }
    }
}
