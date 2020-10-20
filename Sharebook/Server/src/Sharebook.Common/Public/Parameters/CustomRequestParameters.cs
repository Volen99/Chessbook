namespace Sharebook.Common.Public.Parameters
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    /// <summary>
    /// Allow developers to enhance default requests with additional query parameters
    /// </summary>
    public interface ICustomRequestParameters
    {
        /// <summary>
        /// Collection of custom query parameters.
        /// </summary>
        List<Tuple<string, string>> CustomQueryParameters { get; }

        /// <summary>
        /// Formatted string containing all the query parameters to append to a query.
        /// </summary>
        string FormattedCustomQueryParameters { get; }

        /// <summary>
        /// Add a custom query parameter.
        /// </summary>
        void AddCustomQueryParameter(string name, string value);

        /// <summary>
        /// Clear the query parameters of the query.
        /// </summary>
        void ClearCustomQueryParameters();
    }

    public class CustomRequestParameters : ICustomRequestParameters
    {
        private readonly List<Tuple<string, string>> customQueryParameters;

        public CustomRequestParameters()
        {
            this.customQueryParameters = new List<Tuple<string, string>>();
        }

        public CustomRequestParameters(ICustomRequestParameters parameters)
        {
            if (parameters?.CustomQueryParameters == null)
            {
                this.customQueryParameters = new List<Tuple<string, string>>();
                return;
            }

            this.customQueryParameters = parameters.CustomQueryParameters;
        }

        /// <inheritdoc/>
        public void AddCustomQueryParameter(string name, string value)
        {
            this.customQueryParameters.Add(new Tuple<string, string>(name, value));
        }

        /// <inheritdoc/>
        public void ClearCustomQueryParameters()
        {
            this.customQueryParameters.Clear();
        }

        /// <inheritdoc/>
        public List<Tuple<string, string>> CustomQueryParameters => this.customQueryParameters;

        /// <inheritdoc/>
        public string FormattedCustomQueryParameters
        {
            get
            {
                if (this.customQueryParameters.Count == 0)
                {
                    return string.Empty;
                }

                var queryParameters = new StringBuilder($"{this.customQueryParameters[0].Item1}={this.customQueryParameters[0].Item2}");

                for (int i = 1; i < this.customQueryParameters.Count; ++i)
                {
                    queryParameters.Append($"&{this.customQueryParameters[i].Item1}={this.customQueryParameters[i].Item2}");
                }

                return queryParameters.ToString();
            }
        }
    }
}
