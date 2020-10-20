namespace Sharebook.Common.Events
{
    using System;
    using System.Reflection;

    // Code taken from: http://tomlev2.wordpress.com/2010/05/17/c-a-simple-implementation-of-the-weakevent-pattern/
    public class WeakDelegate<TDelegate> : IEquatable<TDelegate>
    {
        private readonly WeakReference targetReference;
        private readonly MethodInfo method;

        public WeakDelegate(Delegate realDelegate)
        {
            if (realDelegate.Target != null)
            {
                this.targetReference = new WeakReference(realDelegate.Target);
            }
            else
                this.targetReference = null;
            this.method = realDelegate.GetMethodInfo();
        }

        public TDelegate GetDelegate()
        {
            return (TDelegate)(object)GetDelegateInternal();
        }

        private Delegate GetDelegateInternal()
        {
            if (this.targetReference != null)
            {
                return this.method.CreateDelegate(typeof(TDelegate), this.targetReference.Target);
            }
            else
            {
                return this.method.CreateDelegate(typeof(TDelegate));
            }
        }

        public bool IsAlive => this.targetReference == null || this.targetReference.IsAlive;

        #region IEquatable<TDelegate> Members

        public bool Equals(TDelegate other)
        {
            Delegate d = (Delegate)(object)other; // wtf? xD 
            return d != null
                && d.Target == this.targetReference.Target
                && d.GetMethodInfo().Equals(this.method);
        }

        #endregion

        internal void Invoke(params object[] args)
        {
            var handler = GetDelegateInternal();
            handler.DynamicInvoke(args);
        }
    }
}
