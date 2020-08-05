namespace WorldFeed.Common.InjectWorldFeed
{
    public interface IFactory<T>
    {
        T Create(params IConstructorNamedParameter[] parameters);

        IConstructorNamedParameter GenerateParameterOverrideWrapper(string parameterName, object parameterValue);
    }

    public class Factory<T> : IFactory<T>
    {
        private readonly ITweetinviContainer container;

        public Factory(ITweetinviContainer container)
        {
            this.container = container;
        }

        public T Create(params IConstructorNamedParameter[] parameters)
        {
            return this.container.Resolve<T>(parameters);
        }

        public IConstructorNamedParameter GenerateParameterOverrideWrapper(string parameterName, object parameterValue)
        {
            return new ConstructorNamedParameter(parameterName, parameterValue);
        }
    }
}
