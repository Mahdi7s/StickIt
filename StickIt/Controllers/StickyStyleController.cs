﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StickIt.Web.Controllers
{
    public class StickyStyleController : ApiControllerBase
    {
        // GET api/stickystyle
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/stickystyle/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/stickystyle
        public void Post([FromBody]string value)
        {
        }

        // PUT api/stickystyle/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/stickystyle/5
        public void Delete(int id)
        {
        }
    }
}
