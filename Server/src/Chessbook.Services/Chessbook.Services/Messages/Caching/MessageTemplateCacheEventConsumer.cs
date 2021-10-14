﻿using System.Threading.Tasks;

using Chessbook.Core.Domain.Messages;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Messages.Caching
{
    /// <summary>
    /// Represents a message template cache event consumer
    /// </summary>
    public partial class MessageTemplateCacheEventConsumer : CacheEventConsumer<MessageTemplate>
    {
        /// <summary>
        /// Clear cache data
        /// </summary>
        /// <param name="entity">Entity</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        protected override async Task ClearCacheAsync(MessageTemplate entity)
        {
            await RemoveByPrefixAsync(NopMessageDefaults.MessageTemplatesByNamePrefix, entity.Name);
        }
    }
}
