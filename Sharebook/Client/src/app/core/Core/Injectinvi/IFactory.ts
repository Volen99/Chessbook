
    export interface IFactory<T>
    {
        T Create(params IConstructorNamedParameter[] parameters);
        IConstructorNamedParameter GenerateParameterOverrideWrapper(string parameterName, object parameterValue);
    }

    export class Factory<T> implements IFactory<T>
    {
        private readonly _container: ITweetinviContainer;

        constructor(container: ITweetinviContainer)
        {
            this._container = container;
        }

        public T Create(params IConstructorNamedParameter[] parameters)
        {
            return _container.Resolve<T>(parameters);
        }

        public IConstructorNamedParameter GenerateParameterOverrideWrapper(string parameterName, object parameterValue)
        {
            return new ConstructorNamedParameter(parameterName, parameterValue);
        }
    }
