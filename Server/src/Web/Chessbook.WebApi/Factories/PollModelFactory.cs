using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Chessbook.Core;
using Chessbook.Core.Caching;
using Chessbook.Web.Infrastructure.Cache;
using Chessbook.Web.Models.Polls;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Core.Domain.Polls;
using Chessbook.Services.Helpers;

namespace Chessbook.Web.Factories
{
    /// <summary>
    /// Represents the poll model factory
    /// </summary>
    public partial class PollModelFactory : IPollModelFactory
    {
        #region Fields

        private readonly IPollService _pollService;
        private readonly IStaticCacheManager _staticCacheManager;
        private readonly IStoreContext _storeContext;
        private readonly IWorkContext _workContext;
        private readonly IDateTimeHelper dateTimeHelper;

        #endregion

        #region Ctor

        public PollModelFactory(IPollService pollService, IStaticCacheManager staticCacheManager, IStoreContext storeContext, IWorkContext workContext,
            IDateTimeHelper dateTimeHelper)
        {
            _pollService = pollService;
            _staticCacheManager = staticCacheManager;
            _storeContext = storeContext;
            _workContext = workContext;
            this.dateTimeHelper = dateTimeHelper;
        }

        #endregion

        #region Methods

        /// <summary>
        /// Prepare the poll model
        /// </summary>
        /// <param name="poll">Poll</param>
        /// <param name="setAlreadyVotedProperty">Whether to load a value indicating that customer already voted for this poll</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the poll model
        /// </returns>
        public virtual async Task<PollModel> PreparePollModelAsync(Poll poll, bool setAlreadyVotedProperty)
        {
            if (poll == null)
            {
                throw new ArgumentNullException(nameof(poll));
            }

            var alreadyVoted =  await _pollService.AlreadyVotedAsync(poll.Id, (await _workContext.GetCurrentCustomerAsync()).Id);
            var model = new PollModel
            {
                Id = poll.Id,
                AlreadyVoted = setAlreadyVotedProperty && alreadyVoted.Any(),
                OwnVotes = alreadyVoted.Select(pvr => pvr.PollAnswerId).ToList(),
                Question = poll.Question,
                StartDateUtc = await this.dateTimeHelper.ConvertToUserTimeAsync(poll.StartDateUtc, DateTimeKind.Utc),
                ExpiresAt = await this.dateTimeHelper.ConvertToUserTimeAsync(poll.ExpiresAt, DateTimeKind.Utc),
                Views = poll.Views,
            };
            var answers = await _pollService.GetPollAnswerByPollAsync(poll.Id);

            foreach (var answer in answers)
            {
                model.TotalVotes += answer.NumberOfVotes;
            }

            foreach (var pa in answers)
            {
                model.Answers.Add(new PollAnswerModel
                {   
                    Id = pa.Id,
                    Label = pa.Label,
                    NumberOfVotes = pa.NumberOfVotes,
                    PercentOfTotalVotes = model.TotalVotes > 0 ? ((Convert.ToDouble(pa.NumberOfVotes) / Convert.ToDouble(model.TotalVotes)) * Convert.ToDouble(100)) : 0,
                });
            }

            return model;
        }

        /// <summary>
        /// Get the poll model by poll system keyword
        /// </summary>
        /// <param name="systemKeyword">Poll system keyword</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the poll model
        /// </returns>
        public virtual async Task<PollModel> PreparePollModelBySystemNameAsync(string systemKeyword)
        {
            if (string.IsNullOrWhiteSpace(systemKeyword))
                return null;

            var cacheKey = _staticCacheManager.PrepareKeyForDefaultCache(NopModelCacheDefaults.PollBySystemNameModelKey,
                systemKeyword, await _workContext.GetWorkingLanguageAsync(), await _storeContext.GetCurrentStoreAsync());

            var cachedModel = await _staticCacheManager.GetAsync(cacheKey, async () =>
            {
                var poll = (await _pollService
                    .GetPollsAsync((await _storeContext.GetCurrentStoreAsync()).Id, (await _workContext.GetWorkingLanguageAsync()).Id, systemKeyword: systemKeyword))
                    .FirstOrDefault();

                // we do not cache nulls. that's why let's return an empty record (ID = 0)
                if (poll == null)
                {
                    return new PollModel { Id = 0 };
                }

                return await PreparePollModelAsync(poll, false);
            });

            if ((cachedModel?.Id ?? 0) == 0)
                return null;

            // "AlreadyVoted" property of "PollModel" object depends on the current customer. Let's update it.
            // But first we need to clone the cached model (the updated one should not be cached)
            var model = cachedModel with { };
            model.AlreadyVoted = (await _pollService.AlreadyVotedAsync(model.Id, (await _workContext.GetCurrentCustomerAsync()).Id)).Any();

            return model;
        }

        /// <summary>
        /// Prepare the home page poll models
        /// </summary>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the list of the poll model
        /// </returns>
        public virtual async Task<List<PollModel>> PrepareHomepagePollModelsAsync()
        {
            var customer = await _workContext.GetCurrentCustomerAsync();
            var store = await _storeContext.GetCurrentStoreAsync();
            var language = await _workContext.GetWorkingLanguageAsync();
            var cacheKey = _staticCacheManager.PrepareKeyForDefaultCache(NopModelCacheDefaults.HomepagePollsModelKey, language, store);

            var cachedPolls = await _staticCacheManager.GetAsync(cacheKey, async () =>
            {
                var polls = await _pollService.GetPollsAsync(store.Id, language.Id, loadShownOnHomepageOnly: true);
                var pollsModels = await polls.SelectAwait(async poll => await PreparePollModelAsync(poll, false)).ToListAsync();
                return pollsModels;
            });

            // "AlreadyVoted" property of "PollModel" object depends on the current customer. Let's update it.
            // But first we need to clone the cached model (the updated one should not be cached)
            var model = new List<PollModel>();
            foreach (var poll in cachedPolls)
            {
                var pollModel = poll with { };
                pollModel.AlreadyVoted = (await _pollService.AlreadyVotedAsync(pollModel.Id, customer.Id)).Any();
                model.Add(pollModel);
            }

            return model;
        }

        #endregion
    }
}
