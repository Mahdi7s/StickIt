using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StickIt.Data.Contracts;
using StickIt.Model;
using TS7S.Entity;

namespace StickIt.Data
{
    public sealed class StickSheetRepository : Repository<StickSheet>, IStickSheetRepository
    {
        public StickSheetRepository(DbContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<StickSheet> GetBriefs(int bookId, int sheetItems = 3)
        {
            return
                _dbSet.Where(x => x.StickBookId.Equals(bookId)).OrderBy(x => x.Order).ToArray().Select(
                    x =>
                    new StickSheet
                        {
                            StickSheetId = x.StickSheetId,
                            StickBookId = bookId,
                            Order = x.Order,
                            Title = x.Title,
                            StickSheetItems =
                                _dbContext.Set<StickSheetItem>().Where(z => z.StickSheetId.Equals(x.StickSheetId)).
                                OrderBy(z => z.Order).
                                Take(sheetItems).ToList()
                        });
        }

        public StickSheet GetWithDetails(int id)
        {
            var retval = _dbSet.Where(x => x.StickSheetId.Equals(id)).Include(x => x.StickSheetItems).FirstOrDefault();
            if (retval != null)
            {
                retval.StickSheetItems = retval.StickSheetItems.OrderBy(x => x.Order).ToList();
            }
            return retval;
        }
    }
}
