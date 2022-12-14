using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StickIt.Data.Contracts;
using StickIt.Model;
using TS7S.Entity;

namespace StickIt.Data
{
    public sealed class StickItUow : UowBase, IStickItUow
    {
        public StickItUow(IRepositoryProvider repositoryProvider) : base(repositoryProvider)
        {
        }

        protected override void CreateDbContext()
        {
            DbContext = new StickItDbContext();

            DbContext.Configuration.LazyLoadingEnabled = false;
            DbContext.Configuration.ProxyCreationEnabled = false;
            DbContext.Configuration.ValidateOnSaveEnabled = false;
        }

        public IPlaceRepository Places { get { return GetRepo<IPlaceRepository>(); } }
        public IStickBookRepository StickBooks { get { return GetRepo<IStickBookRepository>(); } }
        public IStickSheetRepository StickSheets { get { return GetRepo<IStickSheetRepository>(); } }
        public IStickSheetItemRepository StickSheetItems { get { return GetRepo<IStickSheetItemRepository>(); } }

        private T GetRepo<T>() where T:class
        {
            return RepositoryProvider.GetRepository<T>();
        }
    }
}
