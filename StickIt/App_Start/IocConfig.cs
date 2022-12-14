using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Ninject;
using StickIt.Data;
using StickIt.Data.Contracts;
using TS7S.Entity;

namespace StickIt.Web
{
    public class IocConfig
    {
        public static void RegisterIoC(HttpConfiguration config)
        {
            var kernel = new StandardKernel();

            kernel.Bind<RepositoryFactories>().To<RepositoryFactories>().InSingletonScope();
            kernel.Bind<IRepositoryProvider>().To<RepositoryProvider>(); // will be created every time
            kernel.Bind<IStickItUow>().To<StickItUow>();

            // change WebApi default Dependency Resolver
            config.DependencyResolver = new NinjectDependencyResolver(kernel);
        }
    }
}