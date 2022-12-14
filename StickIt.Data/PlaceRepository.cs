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
    public sealed class PlaceRepository : Repository<Place>, IPlaceRepository
    {
        public PlaceRepository(DbContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<Place> GetBreifs()
        {
            return GetAll().Select(x => new Place {PlaceId = x.PlaceId, Name = x.Name, Order = x.Order});
        }
    }
}
