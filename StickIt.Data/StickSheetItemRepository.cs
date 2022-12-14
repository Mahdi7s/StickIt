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
    public class StickSheetItemRepository : Repository<StickSheetItem>, IStickSheetItemRepository
    {
        public StickSheetItemRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
