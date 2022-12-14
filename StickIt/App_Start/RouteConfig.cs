using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace StickIt.Web
{
    public class RouteConfig
    {
        public const string ControllerOnly = "ApiControllerOnly";
        public const string ControllerAndId = "ApiControllerAndIntegerId";
        public const string ControllerAction = "ApiControllerAction";

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapHttpRoute(ControllerOnly,
                                "api/{controller}");

            routes.MapHttpRoute(ControllerAndId,
                                "api/{controller}/{id}",
                                defaults: null,
                                constraints: new {id = "^\\d+$"});

            routes.MapHttpRoute(ControllerAction,
                                "api/{controller}/{action}");

            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //);
        }
    }
}