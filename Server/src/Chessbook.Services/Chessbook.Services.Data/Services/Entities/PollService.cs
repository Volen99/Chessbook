using Chessbook.Data.Common.Repositories;
using Chessbook.Data.Models.Polls;
using Chessbook.Services.Mapping;
using Chessbook.Web.Models.Outputs.Polls;
using Chessbook.Web.Models.Polls;
using Microsoft.EntityFrameworkCore;
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
        private readonly IRepository<PollOption> _pollAnswerRepository;
        private readonly IRepository<PollVotingRecord> _pollVotingRecordRepository;

        public PollService(
            IRepository<Poll> pollRepository,
            IRepository<PollOption> pollAnswerRepository,
            IRepository<PollVotingRecord> pollVotingRecordRepository)
        {
            _pollRepository = pollRepository;
            _pollAnswerRepository = pollAnswerRepository;
            _pollVotingRecordRepository = pollVotingRecordRepository;
        }

        public async Task<bool> AlreadyVotedAsync(int pollId, int customerId)
        {
            if (pollId == 0 || customerId == 0)
            {
                return false;
            }

            var result = await
               (from pa in _pollAnswerRepository.All()
                join pvr in _pollVotingRecordRepository.All() on pa.Id equals pvr.PollAnswerId
                where pa.PollId == pollId && pvr.CustomerId == customerId
                select pvr)
               .AnyAsync();

            return result;
        }

        public Task DeletePollAnswerAsync(PollOption pollAnswer)
        {
            throw new NotImplementedException();
        }

        public Task DeletePollAsync(Poll poll)
        {
            throw new NotImplementedException();
        }

        public async Task<PollOption> GetPollAnswerByIdAsync(int pollAnswerId)
        {
            return await this._pollAnswerRepository.All().Where(po => po.Id == pollAnswerId)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>> GetPollAnswerByPollAsync<T>(int pollId, int pageIndex = 0, int pageSize = int.MaxValue)
        {
            var options = await this._pollAnswerRepository.All().Where(po => po.PollId == pollId)
                .To<T>()
                .ToListAsync();

            return options;
        }

        public async Task<T> GetPollByIdAsync<T>(int pollId)
        {
            var poll = await _pollRepository.All().Where(p => p.Id == pollId)
                .To<T>()
                .FirstOrDefaultAsync();

            return poll;

        }

        public async Task<Poll> GetPollByIdClean(int pollId)
        {
            var poll = await _pollRepository.All().Where(p => p.Id == pollId)
              .FirstOrDefaultAsync();

            return poll;
        }

        public Task<List<Poll>> GetPollsAsync(int storeId, int languageId = 0, bool showHidden = false, bool loadShownOnHomepageOnly = false, string systemKeyword = null, int pageIndex = 0, int pageSize = int.MaxValue)
        {
            throw new NotImplementedException();
        }

        public async Task<int> GetPollVotes(int pollId)
        {
            var pollCount = await this._pollAnswerRepository.All()
                .Where(po => po.PollId == pollId)
                .SumAsync(po => po.Votes);

            return pollCount;
        }

        public async Task<IEnumerable<PollVotingRecord>> GetPollVotingRecordsByPollAnswerAsync(int pollAnswerId, int pageIndex = 0, int pageSize = int.MaxValue)
        {
            var query = _pollVotingRecordRepository.All().Where(pa => pa.PollAnswerId == pollAnswerId);

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<PollOption>> InsertPollAnswerAsync(int pollId, string[] pollOptions)
        {
            var options = new List<PollOption>();
            for (int i = 0; i < pollOptions.Length; i++)
            {
                options.Add(new PollOption
                {
                    Label = pollOptions[i],
                    Position = i + 1,
                    PollId = pollId
                });
            }

            foreach (var option in options)
            {
                await this._pollAnswerRepository.AddAsync(option);
            }
            await this._pollAnswerRepository.SaveChangesAsync();

            return options;
        }

        public async Task<int> InsertPollAsync(PollCreateBody poll, string status, bool isSurvey)
        {
            var pollNew = new Poll
            {
                Question = status,
                SystemKeyword = string.Empty,
                Published = true,
                ShowOnHomepage = true,
                DisplayOrder = 1,
                IsSurvey = isSurvey,
                StartDateUtc = DateTime.UtcNow,
            };
            

            await this._pollRepository.AddAsync(pollNew);
            await this._pollRepository.SaveChangesAsync();

            return pollNew.Id;
        }

        public async Task InsertPollVotingRecordAsync(PollVotingRecord pollVotingRecord)
        {
            await this._pollVotingRecordRepository.AddAsync(pollVotingRecord);
            await this._pollVotingRecordRepository.SaveChangesAsync();
        }

        public async Task UpdatePollAnswerAsync(PollOption pollAnswer)
        {
            await this._pollAnswerRepository.SaveChangesAsync();
        }

        public async Task UpdatePollAsync(Poll poll)
        {
            await this._pollRepository.SaveChangesAsync();
        }

        public async Task<T> WeeklySurvey<T>()
        {
            var survey = await _pollRepository.All().Where(p => p.IsSurvey == true)
               .OrderByDescending(x => x.Id)
               .To<T>()
               .FirstOrDefaultAsync();

            return survey;
        }
    }
}
