using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StickIt.Model;
using TS7S.Entity;

namespace StickIt.Data.Contracts
{
    public interface IStickSheetRepository : IRepository<StickSheet>
    {
        IEnumerable<StickSheet> GetBriefs(int bookId, int sheetItems);
        StickSheet GetWithDetails(int id);
    }
}
