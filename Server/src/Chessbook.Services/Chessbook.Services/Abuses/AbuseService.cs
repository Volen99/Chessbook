using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using Chessbook.Core;
using Chessbook.Core.Domain.Abuse;
using Chessbook.Data;

namespace Chessbook.Services.Abuses
{
    public class AbuseService : IAbuseService
    {
        private readonly IRepository<Abuse> abuseRepository;
        private readonly IRepository<PostAbuseModel> postAbuseRepository;
        private readonly IRepository<PostCommentAbuseModel> postCommentAbuseRepository;

        public AbuseService(IRepository<Abuse> abuseRepository, IRepository<PostAbuseModel> postAbuseRepository,
            IRepository<PostCommentAbuseModel> postCommentAbuseRepository)
        {
            this.abuseRepository = abuseRepository;
            this.postAbuseRepository = postAbuseRepository;
            this.postCommentAbuseRepository = postCommentAbuseRepository;
        }

        public async Task<int> CreatePostAbuse(Abuse baseAbuse, int postId)
        {
            var abuseNew = new PostAbuseModel
            {
                AbuseId = baseAbuse.Id,
                PostId = postId,
                CreatedAt = DateTime.UtcNow,
            };

            baseAbuse.PostAbuseId = abuseNew.PostId;
            await this.abuseRepository.InsertAsync(baseAbuse);

            abuseNew.AbuseId = baseAbuse.Id;
            await this.postAbuseRepository.InsertAsync(abuseNew);

            return abuseNew.Id;
        }

        public async Task<int> CreateCommentAbuse(Abuse baseAbuse, int commentId)
        {
            var abuseNew = new PostCommentAbuseModel
            {
                PostCommentId = commentId,
                CreatedAt = DateTime.UtcNow,
            };

            baseAbuse.PostCommentAbuseId = abuseNew.PostCommentId;

            await this.abuseRepository.InsertAsync(baseAbuse);

            abuseNew.AbuseId = baseAbuse.Id;
            await this.postCommentAbuseRepository.InsertAsync(abuseNew);

            return abuseNew.Id;
        }

        public async Task<int> CreateAccountAbuse(Abuse baseAbuse, int reporterAccountId, int flaggedAccountId)
        {
            var abuseNew = new Abuse
            {
                ReporterAccountId = reporterAccountId,
                FlaggedAccountId = flaggedAccountId,
                Reason = baseAbuse.Reason,
                PredefinedReasons = baseAbuse.PredefinedReasons,
                State = baseAbuse.State,
                CreatedAt = DateTime.UtcNow,
            };

            await this.abuseRepository.InsertAsync(abuseNew);

            return abuseNew.Id;
        }

        public async Task<Abuse> LoadByIdWithReporter(int id)
        {
            var abuse = await this.abuseRepository.Table.Where(a => a.ReporterAccountId == id)
                .Include(x => x.ReporterAccount)
                .FirstOrDefaultAsync();

            return abuse;
        }

        public async Task<IPagedList<Abuse>> ListMyAbuses(int start, int count, string sort, int? id = null, string search = null,
            AbuseState? abuseState = 0, int? customerId = null)
        {
            var abuses = await this.abuseRepository.GetAllPagedAsync(query =>
            {
                // user
                if (customerId.HasValue && customerId.Value > 0)
                {
                    query = query.Where(a => a.ReporterAccountId == customerId);
                }

                query = query.OrderByDescending(a => a.CreatedAt).ThenBy(a => a.Id);

                return query;
            }, start, count);

            return abuses;
        }

        public async Task<IPagedList<Abuse>> ListAbusesForAdmins(int start, int count, string sort, string filter, int? accountId = null, int? id = null,
            List<string> predefinedReasons = null, AbuseState? abuseState = 0, string videoIs = null, string search = null, string searchReporter = null,
            string searchReportee = null, string searchVideo = null)
        {
            var abuses = await this.abuseRepository.GetAllPagedAsync(query =>
            {
                query = query.OrderByDescending(a => a.CreatedAt).ThenBy(a => a.Id);

                return query;
            }, start, count);

            return abuses;
        }

        /// <summary>
        /// Parse "predefinedReasons enum Ids" property
        /// </summary>
        /// <param name="product">Product</param>
        /// <returns>A list of required product IDs</returns>
        public int[] ParsePredefinedReasonsIds(Abuse abuse)
        {
            if (abuse == null)
            {
                throw new ArgumentNullException(nameof(abuse));
            }

            if (string.IsNullOrEmpty(abuse.PredefinedReasons))
            {
                return Array.Empty<int>();
            }

            var ids = new List<int>();

            foreach (var idStr in abuse.PredefinedReasons
                .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(x => x.Trim()))
                if (int.TryParse(idStr, out var id))
                    ids.Add(id);

            return ids.ToArray();
        }

        public int CountReportsForPost(int postId)
        {
            var result = from tbl in postAbuseRepository.Table
                         where tbl.PostId == postId                                     // AND "videoId" IS NOT NULL'
                         select postAbuseRepository.Table;

            var count = result.Count();

            return count;
        }
    }
}
