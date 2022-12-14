using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Dependencies;
using Ninject;
using Ninject.Syntax;

namespace StickIt.Web
{
    public class NinjectDependencyScope : IDependencyScope
    {
        private IResolutionRoot _resolver;

        internal NinjectDependencyScope(IResolutionRoot resolver)
        {
            _resolver = resolver;
        }

        public void Dispose()
        {
            var disResolver = _resolver as IDisposable;
            if(disResolver != null)
                disResolver.Dispose();
            _resolver = null;
        }

        public object GetService(Type serviceType)
        {
            if(_resolver == null)
                throw new ObjectDisposedException("this", "This scope has already been disposed.");

            return _resolver.TryGet(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            if (_resolver == null)
                throw new ObjectDisposedException("this", "This scope has already been disposed.");

            return _resolver.GetAll(serviceType);
        }
    }
}