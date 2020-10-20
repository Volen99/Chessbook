namespace Sharebook.Upload.Infrastructure.Inject.Contracts
{
    using Sharebook.Common.InjectWorldFeed;

    public interface IFactory<T>
    {
        T Create(params IConstructorNamedParameter[] parameters);

        IConstructorNamedParameter GenerateParameterOverrideWrapper(string parameterName, object parameterValue);
    }

    public class Factory<T> : IFactory<T>
    {
        private readonly IUploadContainer container;

        public Factory(IUploadContainer container)
        {
            this.container = container;
        }

        public T Create(params IConstructorNamedParameter[] parameters)
        {
            // Resolving a component is roughly equivalent to calling "new" to instantiate a class.
            // That’s really, really oversimplifying it, but from an analogy perspective it’s fine
            return this.container.Resolve<T>(parameters);
        }

        public IConstructorNamedParameter GenerateParameterOverrideWrapper(string parameterName, object parameterValue)
        {
            return new ConstructorNamedParameter(parameterName, parameterValue);
        }
    }
}
