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
    public sealed class StickyStyleRepository : Repository<StickyStyle>, IStickyStyleRepository
    {
        public StickyStyleRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
