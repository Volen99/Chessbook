using Chessbook.Data;
using Chessbook.Data.Common.Repositories;
using Chessbook.Data.Models.Polls;
using Chessbook.Services.Mapping;
using Chessbook.Web.Models.Outputs.Polls;
using Chessbook.Web.Models.Polls;
using Nop.Core;
using Nop.Services.Stores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Services.Data.Services.Entities
{
    public class PollService : IPollService
    {
        private readonly IRepository<Poll> _pollRepository;
        private readonly IRepository<PollAnswer> _pollAnswerRepository;
        private readonly IRepository<PollVotingRecord> _pollVotingRecordRepository;
        private readonly IStoreMappingService _storeMappingService;

        public PollService(
            IRepository<Poll> pollRepository,
            IRepository<PollAnswer> pollAnswerRepository,
            IRepository<PollVotingRecord> pollVotingRecordRepository,
            IStoreMappingService storeMappingService)
        {
            _pollRepository = pollRepository;
            _pollAnswerRepository = pollAnswerRepository;
            _pollVotingRecordRepository = pollVotingRecordRepository;
            _storeMappingService = storeMappingService;
        }

        public async Task<bool> AlreadyVotedAsync(int pollId, int customerId)
        {
            if (pollId == 0 || customerId == 0)
            {
                return false;
            }

            var result = await
               (from pa in _pollAnswerRepository.Table
                join pvr in _pollVotingRecordRepository.Table on pa.Id equals pvr.PollAnswerId
                where pa.PollId == pollId && pvr.CustomerId == customerId
                select pvr)
               .AnyAsync();

            return result;
        }

        public Task DeletePollAnswerAsync(PollAnswer pollAnswer)
        {
            throw new NotImplementedException();
        }

        public Task DeletePollAsync(Poll poll)
        {
            throw new NotImplementedException();
        }

        public async Task<PollAnswer> GetPollAnswerByIdAsync(int pollAnswerId)
        {
            return await this._pollAnswerRepository.Table.Where(po => po.Id == pollAnswerId)
                .FirstOrDefaultAsyncExt();
        }

        /// <summary>
        /// Gets a poll answers by parent poll
        /// </summary>
        /// <param name="pollId">The poll identifier</param>
        /// <returns>Poll answer</returns>
        /// <param name="pageIndex">Page index</param>
        /// <param name="pageSize">Page size</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task<IPagedList<PollAnswer>> GetPollAnswerByPollAsync(int pollId, int pageIndex = 0, int pageSize = int.MaxValue)
        {
            var query = _pollAnswerRepository.Table.Where(pa => pa.PollId == pollId);

            // order records by display order
            query = query.OrderBy(pa => pa.Position).ThenBy(pa => pa.Id);

            // return paged list of polls
            return await query.ToPagedListAsync(pageIndex, pageSize);
        }

        /// <summary>
        /// Gets a poll
        /// </summary>
        /// <param name="pollId">The poll identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the poll
        /// </returns>
        public virtual async Task<Poll> GetPollByIdAsync(int pollId)
        {
            return await _pollRepository.GetByIdAsync(pollId, cache => default);
        }

        /// <summary>
        /// Gets polls
        /// </summary>
        /// <param name="storeId">The store identifier; pass 0 to load all records</param>
        /// <param name="languageId">Language identifier; pass 0 to load all records</param>
        /// <param name="showHidden">Whether to show hidden records (not published, not started and expired)</param>
        /// <param name="loadShownOnHomepageOnly">Retrieve only shown on home page polls</param>
        /// <param name="systemKeyword">The poll system keyword; pass null to load all records</param>
        /// <param name="pageIndex">Page index</param>
        /// <param name="pageSize">Page size</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the polls
        /// </returns>
        public virtual async Task<IPagedList<Poll>> GetPollsAsync(int storeId, int languageId = 0, bool showHidden = false,
            bool loadShownOnHomepageOnly = false, string systemKeyword = null, int pageIndex = 0, int pageSize = int.MaxValue)
        {
            var query = _pollRepository.Table;

            //whether to load not published, not started and expired polls
            if (!showHidden)
            {
                var utcNow = DateTime.UtcNow;
                query = query.Where(poll => poll.Published);
                query = query.Where(poll => !poll.StartDateUtc.HasValue || poll.StartDateUtc <= utcNow);
                query = query.Where(poll => !poll.EndDateUtc.HasValue || poll.EndDateUtc >= utcNow);
            }

            // apply store mapping constraints
            query = await _storeMappingService.ApplyStoreMapping(query, storeId);

            //load homepage polls only
            if (loadShownOnHomepageOnly)
            {
                query = query.Where(poll => poll.ShowOnHomepage);
            }

            // filter by language
            if (languageId > 0)
            {
                query = query.Where(poll => poll.LanguageId == languageId);
            }

            // filter by system keyword
            if (!string.IsNullOrEmpty(systemKeyword))
                query = query.Where(poll => poll.SystemKeyword == systemKeyword);

            // order records by display order
            query = query.OrderBy(poll => poll.DisplayOrder).ThenBy(poll => poll.Id);

            // return paged list of polls
            return await query.ToPagedListAsync(pageIndex, pageSize);
        }

        public async Task<int> GetPollVotes(int pollId)
        {
            var pollCount = await this._pollAnswerRepository.Table
                .Where(po => po.PollId == pollId)
                .SumAsync(po => po.NumberOfVotes);

            return pollCount;
        }

        /// <summary>
        /// Gets a poll voting records by parent answer
        /// </summary>
        /// <param name="pollAnswerId">Poll answer identifier</param>
        /// <returns>Poll answer</returns>
        /// <param name="pageIndex">Page index</param>
        /// <param name="pageSize">Page size</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task<IPagedList<PollVotingRecord>> GetPollVotingRecordsByPollAnswerAsync(int pollAnswerId, int pageIndex = 0, int pageSize = int.MaxValue)
        {
            var query = _pollVotingRecordRepository.Table.Where(pa => pa.PollAnswerId == pollAnswerId);

            // return paged list of poll voting records
            return await query.ToPagedListAsync(pageIndex, pageSize);
        }

        public async Task<IEnumerable<PollAnswer>> InsertPollAnswerAsync(int pollId, string[] pollOptions)
        {
            var options = new List<PollAnswer>();
            for (int i = 0; i < pollOptions.Length; i++)
            {
                options.Add(new PollAnswer
                {
                    Label = pollOptions[i],
                    Position = i + 1,
                    PollId = pollId
                });
            }

            foreach (var option in options)
            {
                await this._pollAnswerRepository.InsertAsync(option);
            }

            return options;
        }

        public async Task<int> InsertPollAsync(PollCreateBody poll, string status, bool isSurvey)
        {
            var pollNew = new Poll
            {
                Question = status,
                SystemKeyword = string.Empty,
                Published = true,
                ShowOnHomepage = isSurvey,
                DisplayOrder = 1,
                StartDateUtc = DateTime.UtcNow,
            };
            

            await this._pollRepository.InsertAsync(pollNew);

            return pollNew.Id;
        }

        public async Task InsertPollVotingRecordAsync(PollVotingRecord pollVotingRecord)
        {
            await this._pollVotingRecordRepository.InsertAsync(pollVotingRecord);
        }

        public async Task UpdatePollAnswerAsync(PollAnswer pollAnswer)
        {
            await this._pollAnswerRepository.UpdateAsync(pollAnswer);
        }

        public async Task UpdatePollAsync(Poll poll)
        {
            await _pollRepository.UpdateAsync(poll);
        }

        public async Task<T> WeeklySurvey<T>()
        {
            var survey = await _pollRepository.Table.Where(p => p.ShowOnHomepage == true)
               .OrderByDescending(x => x.Id)
               .To<T>()
               .FirstOrDefaultAsyncExt();

            return survey;
        }
    }
}
