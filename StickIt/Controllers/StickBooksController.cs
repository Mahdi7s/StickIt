using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using StickIt.Model;
using StickIt.Data.Contracts;

namespace StickIt.Web.Controllers
{
    public class StickBooksController : ApiControllerBase
    {
        public StickBooksController(IStickItUow uow)
        {
            this.Uow = uow;
        }

        // GET api/stickbooks
        public IEnumerable<StickBook> Get()
        {
            return Uow.StickBooks.GetAll().ToArray();
        }

        //[ActionName("getbyplaceid")]
        //public IEnumerable<StickBook> GetByPlaceId(int placeId)
        //{
        //    return Uow.StickBooks.GetAll().Where(x => x.PlaceId.Equals(placeId)).ToArray();
        //}

        // GET api/stickbooks/5
        public IEnumerable<StickBook> Get(int id)
        {
            var retval = Uow.StickBooks.GetAll().Where(x => x.PlaceId.Equals(id)).ToArray();
            return retval;
        }

        // POST api/stickbook
        public int Post(StickBook stickBook)
        {
            Uow.StickBooks.Insert(stickBook);
            Uow.Commit();

            return stickBook.StickBookId;
        }

        // PUT api/stickbook/5
        public HttpResponseMessage Put(StickBook stickBook)
        {
            Uow.StickBooks.Update(stickBook);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // DELETE api/stickbook/5
        public HttpResponseMessage Delete(int id)
        {
            Uow.StickBooks.DeleteById(id);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
