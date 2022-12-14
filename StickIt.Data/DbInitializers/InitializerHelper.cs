using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StickIt.Model;

namespace StickIt.Data.DbInitializers
{
    internal static class InitializerHelper
    {
        public static void Seed(StickItDbContext context)
        {
            // places
            context.Places.Add(new Place {Name = "Home", Order = 1});
            context.Places.Add(new Place {Name = "Work", Order = 2});
            context.Places.Add(new Place {Name = "Web", Order = 3});

            context.SaveChanges();
        }
    }
}
