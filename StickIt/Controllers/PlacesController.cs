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
    public class PlacesController : ApiControllerBase
    {
        public PlacesController(IStickItUow uow)
        {
            this.Uow = uow;
        }

        // GET api/places
        public IEnumerable<Place> Get()
        {
            return Uow.Places.GetAll().ToArray();
        }

        // GET api/places/5
        public Place Get(int id)
        {
            var place = Uow.Places.GetByID(id);
            if (place != null) return place;

            throw new HttpResponseException(HttpStatusCode.NotFound);
        }

        // POST api/places
        public int Post(Place place)
        {
            Uow.Places.Insert(place);
            Uow.Commit();

            return place.PlaceId;
        }

        // PUT api/places/5
        public HttpResponseMessage Put(Place place)
        {
            Uow.Places.Update(place);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // DELETE api/places/5
        public HttpResponseMessage Delete(int id)
        {
            Uow.Places.DeleteById(id);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
