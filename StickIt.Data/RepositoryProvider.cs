using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TS7S.Entity;

namespace StickIt.Data
{
    public class RepositoryProvider : RepositoryProviderBase
    {
        private readonly RepositoryFactories _repositoryFactories;

        public RepositoryProvider(RepositoryFactories repositoryFactories)
        {
            _repositoryFactories = repositoryFactories;
        }

        public override IRepository<T> GetRepositoryForEntity<T>()
        {
            return GetRepository<IRepository<T>>(_repositoryFactories.GetRepositoryFactoryForEntity<T>());
        }

        protected override T MakeRepository<T>(Func<DbContext, object> factory) 
        {
            var fact = factory ?? _repositoryFactories.GetRepositoryFactory<T>();
            if (fact == null)
                throw new NotImplementedException("There is no any factory for repository of type: " +
                                                  typeof (T).FullName);
            var retval = (T) fact(DbContext);
            return retval;
        }
    }
}
