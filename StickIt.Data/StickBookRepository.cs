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
    public class StickBookRepository : Repository<StickBook>, IStickBookRepository
    {
        public StickBookRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
