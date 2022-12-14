using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StickIt.Data.Contracts;
using TS7S.Entity;

namespace StickIt.Data
{
    public sealed class RepositoryFactories : IRepositoryFactory
    {
        private readonly Dictionary<Type, Func<DbContext, object>> _stickItFactories =
            new Dictionary<Type, Func<DbContext, object>>
                {
                    {typeof (IPlaceRepository), dbContext => new PlaceRepository(dbContext)},
                    {typeof (IStickBookRepository), dbContext => new StickBookRepository(dbContext)},
                    {typeof (IStickSheetRepository), dbContext => new StickSheetRepository(dbContext)},
                    {typeof (IStickSheetItemRepository), dbContext => new StickSheetItemRepository(dbContext)},
                    {typeof (IStickyStyleRepository), dbContext => new StickyStyleRepository(dbContext)}
                };

        public Func<DbContext, object> GetRepositoryFactory<T>() where T : class
        {
            var repType = typeof (T);
            Func<DbContext, object> retval;

            _stickItFactories.TryGetValue(repType, out retval);
            return retval;
        }

        public Func<DbContext, object> GetRepositoryFactoryForEntity<T>() where T:class
        {
            return GetRepositoryFactory<T>() ?? (dbContext => new Repository<T>(dbContext));
        }
    }
}
