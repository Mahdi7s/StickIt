using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StickIt.Web.Controllers
{
    public class StickSheetItemController : ApiControllerBase
    {
        // GET api/sticksheetitem
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/sticksheetitem/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/sticksheetitem
        public void Post([FromBody]string value)
        {
        }

        // PUT api/sticksheetitem/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/sticksheetitem/5
        public void Delete(int id)
        {
        }
    }
}
