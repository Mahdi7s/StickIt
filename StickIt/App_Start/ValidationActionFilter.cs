using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Filters;
using Newtonsoft.Json.Linq;

namespace StickIt.Web
{
    public class ValidationActionFilter: ActionFilterAttribute
    {
        public override void OnActionExecuting(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            var modelState = actionContext.ModelState;
            if(!modelState.IsValid)
            {
                var errors = new JObject();
                foreach(var key in modelState.Keys)
                {
                    var state = modelState[key];
                    if(state.Errors.Any())
                    {
                        errors[key] = state.Errors.First().ErrorMessage;
                    }
                }

                actionContext.Response = actionContext.Request.CreateResponse<JObject>(HttpStatusCode.BadRequest, errors);
            }
        }
    }
}