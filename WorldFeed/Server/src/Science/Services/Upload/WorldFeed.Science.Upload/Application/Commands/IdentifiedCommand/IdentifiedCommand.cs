using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorldFeed.Science.Upload.Application.Commands.IdentifiedCommand
{
    //  IdentifiedCommand is nothing more than a DTO with and ID plus the wrapped business command object
    public class IdentifiedCommand<T, R> : IRequest<R>
        where T : IRequest<R>
    {
        public Guid Id { get; }

        public T Command { get; }

        public IdentifiedCommand(T command, Guid id)
        {
            this.Command = command;
            this.Id = id;
        }
    }
}
