using System.Linq;
using Chessbook.Core.Domain.Posts;

namespace Chessbook.Services.Entities
{
    public static class PostExtensions
    {
        /// <summary>
        /// Sorts the elements of a sequence in order according to a product sorting rule
        /// </summary>
        /// <param name="productsQuery">A sequence of products to order</param>
        /// <param name="orderBy">Product sorting rule</param>
        /// <returns>An System.Linq.IOrderedQueryable`1 whose elements are sorted according to a rule.</returns>
        public static IOrderedQueryable<Post> OrderBy(this IQueryable<Post> productsQuery, ProductSortingEnum orderBy) 
        {
            return orderBy switch
            {
                // ProductSortingEnum.NameAsc => productsQuery.OrderBy(p => p.Name),
                // ProductSortingEnum.NameDesc => productsQuery.OrderByDescending(p => p.Name),
                // ProductSortingEnum.PriceAsc => productsQuery.OrderBy(p => p.Price),
                // ProductSortingEnum.PriceDesc => productsQuery.OrderByDescending(p => p.Price),
                ProductSortingEnum.CreatedOn => productsQuery.OrderByDescending(p => p.CreatedAt),
                _ => productsQuery.OrderBy(p => p.Id)
            };
        }
    }
}
