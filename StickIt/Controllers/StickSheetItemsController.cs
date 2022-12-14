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
    public class StickSheetItemsController : ApiControllerBase
    {
        public StickSheetItemsController(IStickItUow uow)
        {
            Uow = uow;
        }

        // GET api/sticksheetitem/5
        public IEnumerable<StickSheetItem> Get(int id)
        {
            return Uow.StickSheetItems.GetAll().Where(x => x.StickSheetId.Equals(id)).OrderBy(x => x.Order).ToArray();
        }

        // POST api/sticksheetitem
        public int Post(StickSheetItem stickSheetItem)
        {
            Uow.StickSheetItems.Insert(stickSheetItem);
            Uow.Commit();

            return stickSheetItem.StickSheetItemId;
        }

        // PUT api/sticksheetitem/5
        public HttpResponseMessage Put(StickSheetItem stickSheetItem)
        {
            Uow.StickSheetItems.Update(stickSheetItem);
            Uow.Commit();
            
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // DELETE api/sticksheetitem/5
        public HttpResponseMessage Delete(int id)
        {
            Uow.StickSheetItems.DeleteById(id);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
