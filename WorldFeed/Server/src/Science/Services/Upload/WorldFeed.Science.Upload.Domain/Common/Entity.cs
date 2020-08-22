namespace WorldFeed.Science.Upload.Domain.Common
{
    using System.Collections.Generic;
    using MediatR;

    public abstract class Entity
    {
        private List<INotification> domainEvents;

        public IReadOnlyCollection<INotification> DomainEvents => this.domainEvents?.AsReadOnly();

        public void AddDomainEvent(INotification eventItem)
        {
            this.domainEvents = this.domainEvents ?? new List<INotification>();
            this.domainEvents.Add(eventItem);
        }

        public void RemoveDomainEvent(INotification eventItem)
        {
            this.domainEvents?.Remove(eventItem);
        }

        public void ClearDomainEvents()
        {
            this.domainEvents?.Clear();
        }

        //public TId Id { get; private set; } = default;

        //public override bool Equals(object? obj)
        //{
        //    if (!(obj is Entity other))
        //    {
        //        return false;
        //    }

        //    if (ReferenceEquals(this, other))
        //    {
        //        return true;
        //    }

        //    if (this.GetType() != other.GetType())
        //    {
        //        return false;
        //    }

        //    if (this.Id.Equals(default) || other.Id.Equals(default))
        //    {
        //        return false;
        //    }

        //    return this.Id.Equals(other.Id);
        //}

        //public static bool operator ==(Entity? first, Entity? second)
        //{
        //    if (first is null && second is null)
        //    {
        //        return true;
        //    }

        //    if (first is null || second is null)
        //    {
        //        return false;
        //    }

        //    return first.Equals(second);
        //}

        //public static bool operator !=(Entity? first, Entity>? second) => !(first == second);

        //public override int GetHashCode() => (this.GetType().ToString() + this.Id).GetHashCode();
    }
}
