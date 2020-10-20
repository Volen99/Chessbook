namespace Sharebook.Post.Application.Commands.IdentifiedCommand
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;

    using Microsoft.Extensions.Logging;

    public class IdentifiedCommandHandler<T, R> : IRequestHandler<IdentifiedCommand<T, R>, R>
        where T : IRequest<R>
    {
        private readonly IMediator mediator;
       // private readonly IRequestManager requestManager;
        private readonly ILogger<IdentifiedCommandHandler<T, R>> logger;

        public IdentifiedCommandHandler(IMediator mediator, ILogger<IdentifiedCommandHandler<T, R>> logger)
        {
            this.mediator = mediator;
            //this.requestManager = requestManager;
            this.logger = logger ?? throw new System.ArgumentNullException(nameof(logger));
        }

        public Task<R> Handle(IdentifiedCommand<T, R> request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        protected virtual R CreateResultForDuplicateRequest()
        {
            return default(R);
        }
    }
}
