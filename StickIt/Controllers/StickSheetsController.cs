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
    public class StickSheetsController : ApiControllerBase
    {
        public StickSheetsController(IStickItUow uow)
        {
            Uow = uow;
        }

        // GET api/sticksheet
        public IEnumerable<StickSheet> Get()
        {
            return Uow.StickSheets.GetAll().ToArray();
        }

        // GET api/sticksheet/5
        public IEnumerable<StickSheet> Get(int id)
        {
            return Uow.StickSheets.GetBriefs(id, 3).ToArray();
        }

        // POST api/sticksheet
        public int Post(StickSheet stickSheet)
        {
            Uow.StickSheets.Insert(stickSheet);
            Uow.Commit();

            return stickSheet.StickSheetId;
        }

        // PUT api/sticksheet/5
        public HttpResponseMessage Put(StickSheet stickSheet)
        {
            Uow.StickSheets.Update(stickSheet);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // DELETE api/sticksheet/5
        public HttpResponseMessage Delete(int id)
        {
            Uow.StickSheets.DeleteById(id);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
