using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using StickIt.Data.Contracts;
using StickIt.Model;

namespace StickIt.Web.Controllers
{
    public class StickSheetController : ApiControllerBase
    {
        public StickSheetController(IStickItUow uow)
        {
            Uow = uow;
        }

        // GET api/sticksheet/5
        public StickSheet Get(int id)
        {
            var retval = Uow.StickSheets.GetWithDetails(id);
            if (retval == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            return retval;
        }
    }
}
