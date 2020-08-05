namespace WorldFeed.Common.Wrappers
{
    public interface IParameterOverrideWrapper : IResolverOverrideWrapper
    {
        string ParameterName { get; set; }

        object ParameterValue { get; set; }
    }
}
