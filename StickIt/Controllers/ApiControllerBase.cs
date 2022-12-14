using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using StickIt.Data.Contracts;

namespace StickIt.Web.Controllers
{
    public abstract class ApiControllerBase : ApiController
    {
        protected IStickItUow Uow { get; set; }
    }
}