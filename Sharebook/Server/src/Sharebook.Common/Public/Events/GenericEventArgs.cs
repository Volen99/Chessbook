namespace Sharebook.Common.Public.Events
{
    using System;

    /// <summary>
    /// EventArgs with value of Type T
    /// </summary>
    public class GenericEventArgs<T> : EventArgs
    {
        public T Value { get; }

        public GenericEventArgs(T value)
        {
            Value = value;
        }
    }
}